const API_SERVICOS = "http://localhost:3000/historicoServicos";

const API_VENDAS = "http://localhost:3000/historicoVendas";
const listaServicos = document.getElementById("lista-servicos");

const listaVendas = document.getElementById("lista-vendas");
async function carregarServicos() {

  const response = await fetch(API_SERVICOS);

  const servicos = await response.json();

  renderizarServicos(servicos);
}
function renderizarServicos(servicos) {

  listaServicos.innerHTML = "";

  servicos.forEach((servico) => {

    listaServicos.innerHTML += `
    
      <div class="card-historico">

        <h3>${servico.servico}</h3>

        <p><strong>Técnico:</strong> ${servico.tecnico}</p>

        <p><strong>Data:</strong> ${servico.data}</p>

        <p><strong>Status:</strong> ${servico.status}</p>

        <p><strong>Valor:</strong> R$ ${servico.valor}</p>

      </div>

    `;
  });
}
async function carregarVendas() {

  const response = await fetch(API_VENDAS);

  const vendas = await response.json();

  renderizarVendas(vendas);
}