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