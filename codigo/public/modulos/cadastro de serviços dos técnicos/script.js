const servicos = JSON.parse(localStorage.getItem("servicos")) || [

  {
    titulo: "Análise de solo",
    descricao: "Avaliação da qualidade e nutrientes do solo",
    categoria: "Agronomia",
    preco: "R$ 250",
    localizacao: "Uberlândia - MG"
  },

  {
    titulo: "Controle de pragas",
    descricao: "Monitoramento e combate de pragas agrícolas",
    categoria: "Controle agrícola",
    preco: "R$ 400",
    localizacao: "Patos de Minas - MG"
  }

];

const listaServicos = document.getElementById("lista-servicos");
const contador = document.getElementById("contador");

const formulario = document.getElementById("form-servico");

const inputTitulo = document.getElementById("titulo");
const inputDescricao = document.getElementById("descricao");
const inputCategoria = document.getElementById("categoria");
const inputPreco = document.getElementById("preco");
const inputLocalizacao = document.getElementById("localizacao");

let editandoIndex = null;

function salvarLocalStorage(){

  localStorage.setItem(
    "servicos",
    JSON.stringify(servicos)
  );

}

function renderizarServicos(){

  listaServicos.innerHTML = "";

  servicos.forEach((servico, index) => {

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
              ${servico.preco}
            </p>

          </div>

          <span class="tipo">
            ${servico.categoria}
          </span>

        </div>

        <div class="card-buttons">

          <button 
            class="btn-blue"
            onclick="editarServico(${index})"
          >
            Editar
          </button>

          <button 
            class="btn-red"
            onclick="excluirServico(${index})"
          >
            Excluir
          </button>

        </div>

      </div>

    `;
  });

  contador.innerText = `${servicos.length} serviços`;

  salvarLocalStorage();
}

formulario.addEventListener("submit", function(event){

  event.preventDefault();

  if (
    inputTitulo.value.trim() === "" ||
    inputDescricao.value.trim() === "" ||
    inputPreco.value.trim() === "" ||
    inputLocalizacao.value.trim() === ""
  ){
    alert("Preencha todos os campos.");
    return;
  }

  const novoServico = {

    titulo: inputTitulo.value,

    descricao: inputDescricao.value,

    categoria: inputCategoria.value,

    preco: inputPreco.value,

    localizacao: inputLocalizacao.value
  };

  if(editandoIndex === null){

    servicos.push(novoServico);

  } else {

    servicos[editandoIndex] = novoServico;

    editandoIndex = null;
  }

  renderizarServicos();

  formulario.reset();
});

function excluirServico(index){

  servicos.splice(index, 1);

  renderizarServicos();
}

function editarServico(index){

  const servico = servicos[index];

  inputTitulo.value = servico.titulo;

  inputDescricao.value = servico.descricao;

  inputCategoria.value = servico.categoria;

  inputPreco.value = servico.preco;

  inputLocalizacao.value = servico.localizacao;

  editandoIndex = index;

}

renderizarServicos();