const API_URL = "http://localhost:3000/tecnicos";

const listaTecnicos = document.getElementById("lista-tecnicos");
const perfilTecnico = document.getElementById("perfil-tecnico");

const tituloAvaliacao = document.getElementById("titulo-avaliacao");
async function carregarTecnicos() {

  const response = await fetch(API_URL);

  const tecnicos = await response.json();
  renderizarCards(tecnicos);

  renderizarPerfil(tecnicos[0]);
}
function renderizarCards(tecnicos) {

  listaTecnicos.innerHTML = "";

  tecnicos.forEach((tecnico) => {
    listaTecnicos.innerHTML += `
      ...
    `;
  });

  window.tecnicos = tecnicos;
}
<button
  class="btn btn-success"
  onclick="renderizarPerfil(${tecnico.id})">

  Ver Perfil

</button>
function renderizarPerfil(id) {

  const tecnico = window.tecnicos.find((t) => t.id === id) || window.tecnicos[0];

  tituloAvaliacao.innerText = `Avaliar ${tecnico.nome}`;
  const avaliacoes = tecnico.perfilCompleto.avaliacoesClientes
  .map((avaliacao) => {

    return `
      ...
    `;
  })
  .join("");
  <div class="d-flex gap-3 mt-4">

  <button class="btn btn-success">
    Entrar em Contato
  </button>

  <button class="btn btn-outline-success">
    Deixar Avaliação
  </button>

</div>



