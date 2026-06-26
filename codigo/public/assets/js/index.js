document.addEventListener('DOMContentLoaded', function () {
    const el = document.getElementById('header-auth');
    if (!el) return;
    const usuario = sessionStorage.getItem('usuarioCorrente');
    if (usuario) {
        const u = JSON.parse(usuario);
        el.innerHTML = `<span style="font-size:14px;font-weight:600;color:var(--text-dark);margin-right:12px">${u.nome}</span>
            <button class="btn btn-primary" onclick="sessionStorage.removeItem('usuarioCorrente');location.reload();">Sair</button>`;
    } else {
        el.innerHTML = `<a href="modulos/login/login.html" class="btn btn-primary" style="margin-right:8px">Entrar</a>
            <a href="cadastro.html" class="btn btn-primary">Cadastre-se</a>`;
    }
});
