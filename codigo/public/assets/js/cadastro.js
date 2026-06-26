const API_BASE = 'http://localhost:3000';

function trocarAba(aba, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + aba).classList.add('active');
}

function previewFoto(input, previewId) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => document.getElementById(previewId).src = e.target.result;
    reader.readAsDataURL(file);
}

function lerFotoBase64(inputId) {
    return new Promise(resolve => {
        const file = document.getElementById(inputId).files[0];
        if (!file) { resolve(null); return; }
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(file);
    });
}

async function cadastrarProfissional(event) {
    event.preventDefault();

    const skillsRaw = document.getElementById('p-skills').value;
    const skills = skillsRaw ? skillsRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
    const anos = parseInt(document.getElementById('p-experiencia').value);
    const foto = await lerFotoBase64('p-foto');

    const profissional = {
        name: document.getElementById('p-nome').value,
        email: document.getElementById('p-email').value,
        senha: document.getElementById('p-senha').value,
        estado: document.getElementById('p-estado').value,
        especialidade: document.getElementById('p-especialidade').value,
        experience: anos + ' ano' + (anos !== 1 ? 's' : '') + ' de experiência',
        description: document.getElementById('p-descricao').value,
        skills: skills,
        foto_perfil: foto || 'https://i.pravatar.cc/200?img=' + Math.floor(Math.random() * 70 + 1),
        avaliacao_estrelas: 0,
        total_avaliacoes: 0
    };

    fetch(API_BASE + '/profissionais', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profissional)
    })
    .then(r => r.json())
    .then(dados => {
        window.location.href = 'login.html?email=' + encodeURIComponent(profissional.email);
    })
    .catch(() => {
        alert('Erro ao conectar com o servidor. Verifique se o JSON Server está rodando na porta 3000.');
    });
}

function cadastrarCliente(event) {
    event.preventDefault();

    const cliente = {
        nome: document.getElementById('c-nome').value,
        email: document.getElementById('c-email').value,
        senha: document.getElementById('c-senha').value,
        estado: document.getElementById('c-estado').value,
        tipo: document.getElementById('c-tipo').value,
        telefone: document.getElementById('c-telefone').value
    };

    fetch(API_BASE + '/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    })
    .then(r => r.json())
    .then(dados => {
        window.location.href = 'login.html?email=' + encodeURIComponent(cliente.email) + '&tipo=cliente';
    })
    .catch(() => {
        alert('Erro ao conectar com o servidor. Verifique se o JSON Server está rodando na porta 3000.');
    });
}
