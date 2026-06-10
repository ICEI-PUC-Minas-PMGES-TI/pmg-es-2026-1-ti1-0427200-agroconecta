const API_SERVICOS =
  "http://localhost:3000/historicoServicos";

const API_VENDAS =
  "http://localhost:3000/historicoVendas";

const listaServicos =
  document.getElementById("lista-servicos");

const listaVendas =
  document.getElementById("lista-vendas");

async function carregarServicos() {

  const response =
    await fetch(API_SERVICOS);

  const servicos =
    await response.json();

  renderizarServicos(servicos);
}

async function carregarVendas() {

  const response =
    await fetch(API_VENDAS);

  const vendas =
    await response.json();

  renderizarVendas(vendas);
}

function renderizarServicos(servicos) {

  listaServicos.innerHTML = "";

  servicos.forEach((servico) => {

    listaServicos.innerHTML += `

      <div class="col-md-6">

        <div class="card shadow-sm h-100 p-4">

          <div class="d-flex justify-content-between mb-3">

            <h4 class="fw-bold text-success">
              ${servico.servico}
            </h4>

            <span class="badge bg-success">
              ${servico.status}
            </span>

          </div>

          <p>
            <strong>Técnico:</strong>
            ${servico.tecnico}
          </p>

          <p>
            <strong>Data:</strong>
            ${servico.data}
          </p>

          <p>
            <strong>Valor:</strong>
            R$ ${servico.valor}
          </p>

        </div>

      </div>
    `;
  });
}

function renderizarVendas(vendas) {

  listaVendas.innerHTML = "";

  vendas.forEach((venda) => {

    listaVendas.innerHTML += `

      <div class="col-md-6">

        <div class="card shadow-sm h-100 p-4">

          <h4 class="fw-bold text-success mb-3">
            ${venda.produto}
          </h4>

          <p>
            <strong>Quantidade:</strong>
            ${venda.quantidade}
          </p>

          <p>
            <strong>Comprador:</strong>
            ${venda.comprador}
          </p>

          <p>
            <strong>Data:</strong>
            ${venda.data}
          </p>

          <p>
            <strong>Valor:</strong>
            R$ ${venda.valor}
          </p>

        </div>

      </div>
    `;
  });
}

carregarServicos();

carregarVendas();