from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os

app = Flask(__name__)
CORS(app)

professionals_db = [
    {
        "id": 101,
        "name": "João Silva",
        "especialidade": "Irrigação",
        "avaliacao_estrelas": 5.0,
        "total_avaliacoes": 24,
        "estado": "MG",
        "foto_perfil": "https://i.pravatar.cc/200?img=1",
        "experience": "10 anos de experiência em sistemas de irrigação",
        "description": "Especialista em design e implementação de sistemas de irrigação. Trabalho com agricultores individuais e grandes propriedades rurais.",
        "skills": ["Irrigação", "Hidráulica", "Agricultura de Precisão"]
    },
    {
        "id": 102,
        "name": "Maria Souza",
        "especialidade": "Pecuária",
        "avaliacao_estrelas": 4.8,
        "total_avaliacoes": 15,
        "estado": "MG",
        "foto_perfil": "https://i.pravatar.cc/200?img=5",
        "experience": "8 anos de experiência em gestão pecuária",
        "description": "Técnica especializada em nutrição animal e manejo de rebanhos leiteiros. Consultora de fazendas de médio e grande porte.",
        "skills": ["Pecuária", "Nutrição Animal", "Gestão Rural"]
    },
    {
        "id": 103,
        "name": "Carlos Almeida",
        "especialidade": "Agrícola",
        "avaliacao_estrelas": 4.9,
        "total_avaliacoes": 32,
        "estado": "SP",
        "foto_perfil": "https://i.pravatar.cc/200?img=3",
        "experience": "12 anos de experiência em culturas de soja e milho",
        "description": "Especialista em manejo de pragas e doenças em culturas de soja e milho. Consultoria em agricultura de precisão e sustentabilidade.",
        "skills": ["Soja", "Milho", "Agricultura de Precisão"]
    },
    {
        "id": 104,
        "name": "Ana Costa",
        "especialidade": "Zootecnia",
        "avaliacao_estrelas": 4.7,
        "total_avaliacoes": 18,
        "estado": "GO",
        "foto_perfil": "https://i.pravatar.cc/200?img=7",
        "experience": "7 anos em zootecnia aplicada",
        "description": "Profissional experiente em nutrição de ruminantes e reprodução animal. Consultoria completa para fazendas de diferentes portes.",
        "skills": ["Zootecnia", "Nutrição", "Reprodução Animal"]
    },
    {
        "id": 105,
        "name": "Pedro Santos",
        "especialidade": "Agronomia",
        "avaliacao_estrelas": 5.0,
        "total_avaliacoes": 28,
        "estado": "RS",
        "foto_perfil": "https://i.pravatar.cc/200?img=2",
        "experience": "15 anos em agronomia geral",
        "description": "Agrônomo com experiência em diversas culturas. Especialista em desenvolvimento rural sustentável e agricultura orgânica.",
        "skills": ["Agronomia", "Agricultura Orgânica", "Sustentabilidade"]
    }
]

contacts_log = []

@app.route('/api/search', methods=['POST'])
def search_professionals():
    try:
        data = request.get_json()
        query = data.get('query', '').lower()
        filters = data.get('filters', {})
        
        if not query or len(query) < 2:
            return jsonify({
                'success': False,
                'error': 'Query deve ter pelo menos 2 caracteres'
            }), 400
        
        results = filter_professionals(query, filters)
        
        return jsonify({
            'success': True,
            'results': results,
            'count': len(results)
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/professional/<int:professional_id>', methods=['GET'])
def get_professional(professional_id):
    try:
        professional = next(
            (p for p in professionals_db if p['id'] == professional_id),
            None
        )
        
        if not professional:
            return jsonify({
                'success': False,
                'error': 'Profissional não encontrado'
            }), 404
        
        return jsonify({
            'success': True,
            'professional': professional
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/contact', methods=['POST'])
def send_contact():
    try:
        data = request.get_json()
        professional_id = data.get('professional_id')
        professional_name = data.get('professional_name')
        timestamp = data.get('timestamp', datetime.now().isoformat())
        
        if not professional_id:
            return jsonify({
                'success': False,
                'error': 'professional_id é obrigatório'
            }), 400
        
        contact_record = {
            'professional_id': professional_id,
            'professional_name': professional_name,
            'timestamp': timestamp,
            'status': 'pending'
        }
        
        contacts_log.append(contact_record)
        
        save_contact_log()
        
        return jsonify({
            'success': True,
            'message': 'Solicitação de contato enviada com sucesso',
            'contact_id': len(contacts_log)
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/contacts-log', methods=['GET'])
def get_contacts_log():
    try:
        return jsonify({
            'success': True,
            'contacts': contacts_log,
            'total': len(contacts_log)
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'ok',
        'message': 'API AgroConecta está rodando',
        'professionals_count': len(professionals_db)
    }), 200

def filter_professionals(query, filters):
    results = []
    
    for prof in professionals_db:
        query_match = (
            query in prof['name'].lower() or
            query in prof['especialidade'].lower() or
            query in prof['estado'].lower() or
            any(query in skill.lower() for skill in prof.get('skills', []))
        )
        
        if not query_match:
            continue
        
        if filters.get('region') and prof['estado'] != filters['region']:
            continue
        
        if filters.get('specialty') and filters['specialty'].lower() not in prof['especialidade'].lower():
            continue
        
        if filters.get('rating'):
            try:
                min_rating = float(filters['rating'])
                if prof['avaliacao_estrelas'] < min_rating:
                    continue
            except ValueError:
                pass
        
        results.append(prof)
    
    results.sort(key=lambda x: x['avaliacao_estrelas'], reverse=True)
    
    return results


def save_contact_log():
    try:
        log_file = 'contacts_log.json'
        with open(log_file, 'w', encoding='utf-8') as f:
            json.dump(contacts_log, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f'Erro ao salvar log: {e}')


def load_contact_log():
    global contacts_log
    try:
        log_file = 'contacts_log.json'
        if os.path.exists(log_file):
            with open(log_file, 'r', encoding='utf-8') as f:
                contacts_log = json.load(f)
    except Exception as e:
        print(f'Erro ao carregar log: {e}')
        contacts_log = []


if __name__ == '__main__':
    load_contact_log()
    print('🚀 API AgroConecta iniciada em http://localhost:5000')
    print('📚 Documentação: http://localhost:5000/api/health')
    app.run(debug=True, port=5000)
