const API_URL = "http://localhost:3000/servicos";

let servicos = [];

const listaServicos = document.getElementById("lista-servicos");
const contador = document.getElementById("contador");

const formulario = document.getElementById("form-servico");

const inputTitulo = document.getElementById("titulo");
const inputDescricao = document.getElementById("descricao");
const inputCategoria = document.getElementById("categoria");
const inputPreco = document.getElementById("preco");
const inputLocalizacao = document.getElementById("localizacao");

let editandoId = null;

async function carregarServicos() {

  const resposta = await fetch(API_URL);

  servicos = await resposta.json();

  renderizarServicos();
}

function renderizarServicos() {

  listaServicos.innerHTML = "";

  servicos.forEach((servico) => {

    listaServicos.innerHTML += `

      <div class="card">

        <div class="card-top">

          <div>

            <h3>${servico.titulo}</h3>

            <p class="localizacao">
              ${servico.localizacao}
            </p>

            <p class="descricao">
              ${servico.descricao}
            </p>

            <p class="preco">
              R$ ${servico.preco}
            </p>

          </div>

          <span class="tipo">
            ${servico.categoria}
          </span>

        </div>

        <div class="card-buttons">

          <button
            class="btn-blue"
            onclick="editarServico('${servico.id}')"
          >
            Editar
          </button>

          <button
            class="btn-red"
            onclick="excluirServico('${servico.id}')"
          >
            Excluir
          </button>

        </div>

      </div>

    `;
  });

  contador.innerText = `${servicos.length} serviços`;
}

formulario.addEventListener("submit", async function(event) {

  event.preventDefault();

  if (
    inputTitulo.value.trim() === "" ||
    inputDescricao.value.trim() === "" ||
    inputPreco.value.trim() === "" ||
    inputLocalizacao.value.trim() === ""
  ) {
    alert("Preencha todos os campos.");
    return;
  }

  const servico = {

    titulo: inputTitulo.value,

    descricao: inputDescricao.value,

    categoria: inputCategoria.value,

    preco: inputPreco.value,

    localizacao: inputLocalizacao.value
  };

  if (editandoId === null) {

    await fetch(API_URL, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(servico)
    });

  } else {

    await fetch(`${API_URL}/${editandoId}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        id: editandoId,
        ...servico
      })
    });

    editandoId = null;
  }

  formulario.reset();

  await carregarServicos();
});

async function excluirServico(id) {

  await fetch(`${API_URL}/${id}`, {

    method: "DELETE"
  });

  await carregarServicos();
}

function editarServico(id) {

  const servico = servicos.find(s => s.id === id);

  if (!servico) return;

  inputTitulo.value = servico.titulo;

  inputDescricao.value = servico.descricao;

  inputCategoria.value = servico.categoria;

  inputPreco.value = servico.preco;

  inputLocalizacao.value = servico.localizacao;

  editandoId = id;
}

carregarServicos();