const API_SERVICOS = "http://localhost:3000/historicoServicos";

const API_VENDAS = "http://localhost:3000/historicoVendas";
const listaServicos = document.getElementById("lista-servicos");

const listaVendas = document.getElementById("lista-vendas");
async function carregarServicos() {

  const response = await fetch(API_SERVICOS);

  const servicos = await response.json();

  renderizarServicos(servicos);
}