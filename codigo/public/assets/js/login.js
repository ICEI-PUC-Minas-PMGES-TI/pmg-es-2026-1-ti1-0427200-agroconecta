const LOGIN_URL = "/modulos/login/login.html";
let RETURN_URL = "index.html";
const API_URL = '/usuarios';

var db_usuarios = {};

var usuarioCorrente = {};

function initLoginApp () {
    let pagina = window.location.pathname;
    if (pagina != LOGIN_URL) {
        sessionStorage.setItem('returnURL', pagina);
        RETURN_URL = pagina;

        usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
        if (usuarioCorrenteJSON) {
            usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
        } else {
            window.location.href = LOGIN_URL;
        }

        document.addEventListener('DOMContentLoaded', function () {
            showUserInfo ('userInfo');
        });
    }
    else {
        let returnURL = sessionStorage.getItem('returnURL');
        RETURN_URL = returnURL || RETURN_URL
        
        carregarUsuarios(() => {
            console.log('Usuários carregados...');
        });
    }
};


function carregarUsuarios(callback) {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        db_usuarios = data;
        callback ()
    })
    .catch(error => {
        console.error('Erro ao ler usuários via API JSONServer:', error);
        displayMessage("Erro ao ler usuários");
    });
}

function loginUser (login, senha) {


    for (var i = 0; i < db_usuarios.length; i++) {
        var usuario = db_usuarios[i];

        if (login == usuario.login && senha == usuario.senha) {
            usuarioCorrente.id = usuario.id;
            usuarioCorrente.login = usuario.login;
            usuarioCorrente.email = usuario.email;
            usuarioCorrente.nome = usuario.nome;

            sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));

            return true;
        }
    }

    return false;
}

function logoutUser () {
    sessionStorage.removeItem ('usuarioCorrente');
    window.location = LOGIN_URL;
}

function addUser (nome, login, senha, email) {

    let usuario = { "login": login, "senha": senha, "nome": nome, "email": email };

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    })
        .then(response => response.json())
        .then(data => {
            db_usuarios.push (usuario);
            displayMessage("Usuário inserido com sucesso");
        })
        .catch(error => {
            console.error('Erro ao inserir usuário via API JSONServer:', error);
            displayMessage("Erro ao inserir usuário");
        });
}

function showUserInfo (element) {
    var elemUser = document.getElementById(element);
    if (elemUser) {
        elemUser.innerHTML = `${usuarioCorrente.nome} (${usuarioCorrente.login}) 
                    <a onclick="logoutUser()">❌</a>`;
    }
}

initLoginApp ();

function fazerLoginProfissional(event) {
    event.preventDefault();
    const email = document.getElementById('p-email').value.trim();
    const senha = document.getElementById('p-senha').value;

    fetch('http://localhost:3000/profissionais?email=' + encodeURIComponent(email))
        .then(r => r.json())
        .then(dados => {
            const usuario = dados.find(u => u.senha === senha);
            if (usuario) {
                sessionStorage.setItem('usuarioCorrente', JSON.stringify({
                    id: usuario.id,
                    nome: usuario.name,
                    email: usuario.email,
                    tipo: 'profissional',
                    especialidade: usuario.especialidade
                }));
                window.location.href = '../../index.html';
            } else {
                document.getElementById('msg-erro').style.display = 'block';
            }
        })
        .catch(() => { document.getElementById('msg-erro').style.display = 'block'; });
}

function fazerLoginCliente(event) {
    event.preventDefault();
    const email = document.getElementById('c-email').value.trim();
    const senha = document.getElementById('c-senha').value;

    fetch('http://localhost:3000/clientes?email=' + encodeURIComponent(email))
        .then(r => r.json())
        .then(dados => {
            const usuario = dados.find(u => u.senha === senha);
            if (usuario) {
                sessionStorage.setItem('usuarioCorrente', JSON.stringify({
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    tipo: 'cliente'
                }));
                window.location.href = '../../index.html';
            } else {
                document.getElementById('msg-erro').style.display = 'block';
            }
        })
        .catch(() => { document.getElementById('msg-erro').style.display = 'block'; });
}

function trocarAbaLogin(aba, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-login-' + aba).classList.add('active');
    document.getElementById('msg-erro').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    const tipoParam = params.get('tipo');

    if (tipoParam === 'cliente') {
        const btn = document.querySelectorAll('.tab-btn')[1];
        if (btn) trocarAbaLogin('cliente', btn);
        if (emailParam) document.getElementById('c-email').value = emailParam;
    } else {
        if (emailParam) document.getElementById('p-email').value = emailParam;
    }
});