let profissionalSelecionado = null;
let resultadosBusca = [];
let todosProfissionais = [
    {
        id: 101,
        name: 'João Silva',
        especialidade: 'Irrigação',
        avaliacao_estrelas: 5.0,
        total_avaliacoes: 24,
        estado: 'MG',
        foto_perfil: 'https://i.pravatar.cc/200?img=1',
        experience: '10 anos de experiência em sistemas de irrigação',
        description: 'Especialista em design e implementação de sistemas de irrigação. Trabalho com agricultores individuais e grandes propriedades rurais.',
        skills: ['Irrigação', 'Hidráulica', 'Agricultura de Precisão']
    },
    {
        id: 102,
        name: 'Maria Souza',
        especialidade: 'Pecuária',
        avaliacao_estrelas: 4.8,
        total_avaliacoes: 15,
        estado: 'MG',
        foto_perfil: 'https://i.pravatar.cc/200?img=5',
        experience: '8 anos de experiência em gestão pecuária',
        description: 'Técnica especializada em nutrição animal e manejo de rebanhos leiteiros. Consultora de fazendas de médio e grande porte.',
        skills: ['Pecuária', 'Nutrição Animal', 'Gestão Rural']
    },
    {
        id: 103,
        name: 'Carlos Almeida',
        especialidade: 'Agrícola',
        avaliacao_estrelas: 4.9,
        total_avaliacoes: 32,
        estado: 'SP',
        foto_perfil: 'https://i.pravatar.cc/200?img=3',
        experience: '12 anos de experiência em culturas de soja e milho',
        description: 'Especialista em manejo de pragas e doenças em culturas de soja e milho. Consultoria em agricultura de precisão e sustentabilidade.',
        skills: ['Soja', 'Milho', 'Agricultura de Precisão']
    },
    {
        id: 104,
        name: 'Ana Costa',
        especialidade: 'Zootecnia',
        avaliacao_estrelas: 4.7,
        total_avaliacoes: 18,
        estado: 'GO',
        foto_perfil: 'https://i.pravatar.cc/200?img=9',
        experience: '7 anos de experiência em produção animal',
        description: 'Zootecnista com especialização em bovinocultura de corte e gestão de pastagens.',
        skills: ['Zootecnia', 'Bovinocultura', 'Pastagens']
    },
    {
        id: 105,
        name: 'Pedro Santos',
        especialidade: 'Agropecuária',
        avaliacao_estrelas: 4.6,
        total_avaliacoes: 21,
        estado: 'RS',
        foto_perfil: 'https://i.pravatar.cc/200?img=12',
        experience: '9 anos de experiência em manejo integrado',
        description: 'Técnico em agropecuária com foco em sistemas integrados de produção agrícola e pecuária.',
        skills: ['Agropecuária', 'Sistemas Integrados', 'Gestão Rural']
    },
    {
        id: 106,
        name: 'Fernanda Lima',
        especialidade: 'Agrícola',
        avaliacao_estrelas: 5.0,
        total_avaliacoes: 28,
        estado: 'BA',
        foto_perfil: 'https://i.pravatar.cc/200?img=47',
        experience: '11 anos de experiência em fruticultura',
        description: 'Especialista em cultivo de frutas tropicais e manejo orgânico de pomares.',
        skills: ['Fruticultura', 'Agricultura Orgânica', 'Manejo de Solo']
    }
];

function esconderTodasPaginas() {
    document.getElementById('search-page').style.display = 'none';
    document.getElementById('results-page').style.display = 'none';
    document.getElementById('profile-page').style.display = 'none';
    document.getElementById('chosen-page').style.display = 'none';
    document.getElementById('confirmation-page').style.display = 'none';
}

function mostrarPagina(nomePagina) {
    esconderTodasPaginas();
    document.getElementById(nomePagina).style.display = 'block';
    window.scrollTo(0, 0);
}

function buscar() {
    const busca = document.getElementById('search-input').value;
    
    if (busca === '') {
        alert('Digite algo para buscar');
        return;
    }

    fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: busca,
            filters: {}
        })
    })
    .then(resposta => resposta.json())
    .then(dados => {
        if (dados.results) {
            resultadosBusca = dados.results;
        } else {
            resultadosBusca = dados;
        }
        mostrarResultados();
        mostrarPagina('results-page');
    })
    .catch(erro => {
        console.log('Erro ao conectar com servidor, usando dados de exemplo');
        usarDadosExemplo();
    });
}

function usarDadosExemplo() {
    resultadosBusca = todosProfissionais.filter(p => 
        p.name.toLowerCase().includes(document.getElementById('search-input').value.toLowerCase()) ||
        p.especialidade.toLowerCase().includes(document.getElementById('search-input').value.toLowerCase())
    );
    mostrarResultados();
    mostrarPagina('results-page');
}

function mostrarResultados() {
    const lista = document.getElementById('results-list');
    lista.innerHTML = '';

    if (resultadosBusca.length === 0) {
        lista.innerHTML = '<p>Nenhum profissional encontrado</p>';
        return;
    }

    resultadosBusca.forEach(profissional => {
        const div = document.createElement('div');
        div.className = 'result-card';
        div.innerHTML = `
            <div class="result-image">
                <img src="${profissional.foto_perfil}" alt="${profissional.name}">
            </div>
            <div class="result-info">
                <div class="result-name">${profissional.name}</div>
                <div class="result-role">${profissional.especialidade}</div>
                <div class="result-location">📍 ${profissional.estado}</div>
                <div class="result-rating">
                    <span>${profissional.avaliacao_estrelas} estrelas</span>
                </div>
                <button class="result-view-btn" onclick="abrirPerfil(${profissional.id})">Ver Perfil</button>
            </div>
        `;
        lista.appendChild(div);
    });
}

function abrirPerfil(id) {
    profissionalSelecionado = todosProfissionais.find(p => p.id === id);
    if (!profissionalSelecionado) {
        profissionalSelecionado = resultadosBusca.find(p => p.id === id);
    }
    
    document.getElementById('profile-name').textContent = profissionalSelecionado.name;
    document.getElementById('profile-role').textContent = profissionalSelecionado.especialidade;
    document.getElementById('profile-img').src = profissionalSelecionado.foto_perfil;
    document.getElementById('profile-location-text').textContent = profissionalSelecionado.estado;
    document.getElementById('profile-description').textContent = profissionalSelecionado.description;
    document.getElementById('profile-experience').textContent = profissionalSelecionado.experience;
    document.getElementById('profile-reviews').textContent = profissionalSelecionado.avaliacao_estrelas + ' estrelas';
    
    mostrarPagina('profile-page');
}

function escolherProfissional() {
    document.getElementById('chosen-name').textContent = profissionalSelecionado.name;
    document.getElementById('chosen-role').textContent = profissionalSelecionado.especialidade;
    document.getElementById('chosen-img').src = profissionalSelecionado.foto_perfil;
    document.getElementById('chosen-reviews').textContent = profissionalSelecionado.avaliacao_estrelas + ' estrelas';
    
    mostrarPagina('chosen-page');
}

function enviarContato() {
    fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            professional_id: profissionalSelecionado.id,
            professional_name: profissionalSelecionado.name
        })
    })
    .then(resposta => resposta.json())
    .then(dados => {
        mostrarPagina('confirmation-page');
    })
    .catch(erro => {
        console.log('Contato simulado');
        mostrarPagina('confirmation-page');
    });
}

document.getElementById('search-btn').addEventListener('click', buscar);
document.getElementById('back-to-search').addEventListener('click', () => mostrarPagina('search-page'));
document.getElementById('back-to-results').addEventListener('click', () => mostrarPagina('results-page'));
document.getElementById('back-to-profile').addEventListener('click', () => mostrarPagina('results-page'));
document.getElementById('choose-profile-btn').addEventListener('click', escolherProfissional);
document.getElementById('contact-btn').addEventListener('click', enviarContato);
document.getElementById('back-to-profile').addEventListener('click', () => mostrarPagina('results-page'));
document.getElementById('back-to-search-final').addEventListener('click', () => mostrarPagina('search-page'));

document.getElementById('search-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        buscar();
    }
});

function carregarTodosProfissionais() {
    fetch('http://localhost:3000/profissionais')
    .then(resposta => resposta.json())
    .then(dados => {
        todosProfissionais = dados;
        exibirTodosProfissionais();
    })
    .catch(erro => {
        console.log('Usando dados locais');
        exibirTodosProfissionais();
    });
}

function exibirTodosProfissionais() {
    const lista = document.getElementById('all-professionals-list');
    lista.innerHTML = '';

    todosProfissionais.forEach(profissional => {
        const div = document.createElement('div');
        div.className = 'result-card';
        div.innerHTML = `
            <div class="result-image">
                <img src="${profissional.foto_perfil}" alt="${profissional.name}">
            </div>
            <div class="result-info">
                <div class="result-name">${profissional.name}</div>
                <div class="result-role">${profissional.especialidade}</div>
                <div class="result-location">📍 ${profissional.estado}</div>
                <div class="result-rating">
                    <span>${profissional.avaliacao_estrelas} estrelas</span>
                </div>
                <button class="result-view-btn" onclick="abrirPerfil(${profissional.id})">Ver Perfil</button>
            </div>
        `;
        lista.appendChild(div);
    });
}

window.addEventListener('DOMContentLoaded', carregarTodosProfissionais);
