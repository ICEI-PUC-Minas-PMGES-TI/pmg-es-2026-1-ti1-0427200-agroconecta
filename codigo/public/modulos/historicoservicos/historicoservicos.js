const API_URL = "http://localhost:3000/historicoservicos";

const tabela = document.getElementById("tabela-servicos");

const form = document.getElementById("form-servico");

const pesquisa = document.getElementById("pesquisa");

const totalElemento =
  document.getElementById("total");

let servicos = [];

let editandoId = null;

async function carregarServicos(){

  const response =
    await fetch(API_URL);

  servicos =
    await response.json();

  renderizarTabela(servicos);

}

function renderizarTabela(lista){

  tabela.innerHTML = "";

  let total = 0;

  lista.forEach(servico => {

    total += Number(servico.valor);

    tabela.innerHTML += `
      <tr>

        <td>${servico.servico}</td>

        <td>${servico.cliente}</td>

        <td>${servico.tecnico}</td>

        <td>${servico.data}</td>

        <td>R$ ${servico.valor}</td>

        <td>${servico.status}</td>

        <td>

          <button
            class="btn btn-warning btn-sm"
            onclick="editarServico('${servico.id}')">

            Editar

          </button>

          <button
            class="btn btn-danger btn-sm"
            onclick="deletarServico('${servico.id}')">

            Excluir

          </button>

        </td>

      </tr>
    `;
  });

  totalElemento.innerText =
    `R$ ${total.toFixed(2)}`;

}

form.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    const novoServico = {

      servico:
        document.getElementById("servico").value,

      cliente:
        document.getElementById("cliente").value,

      tecnico:
        document.getElementById("tecnico").value,

      data:
        document.getElementById("data").value,

      valor:
        document.getElementById("valor").value,

      status:
        document.getElementById("status").value

    };

    if(editandoId){

      await fetch(
        `${API_URL}/${editandoId}`,
        {
          method:"PUT",

          headers:{
            "Content-Type":
            "application/json"
          },

          body:
            JSON.stringify({
              id:editandoId,
              ...novoServico
            })
        }
      );

      editandoId = null;

    }else{

      await fetch(API_URL,{

        method:"POST",

        headers:{
          "Content-Type":
          "application/json"
        },

        body:
          JSON.stringify(novoServico)

      });

    }

    form.reset();

    carregarServicos();

});

async function deletarServico(id){

  await fetch(
    `${API_URL}/${id}`,
    {
      method:"DELETE"
    }
  );

  carregarServicos();

}

function editarServico(id){

  const servico =
    servicos.find(
      s => s.id === id
    );

  document.getElementById("servico").value =
    servico.servico;

  document.getElementById("cliente").value =
    servico.cliente;

  document.getElementById("tecnico").value =
    servico.tecnico;

  document.getElementById("data").value =
    servico.data;

  document.getElementById("valor").value =
    servico.valor;

  document.getElementById("status").value =
    servico.status;

  editandoId = id;

}

pesquisa.addEventListener(
  "input",
  () => {

    const texto =
      pesquisa.value.toLowerCase();

    const filtrados =
      servicos.filter(servico =>

        servico.servico
          .toLowerCase()
          .includes(texto)

        ||

        servico.cliente
          .toLowerCase()
          .includes(texto)

      );

    renderizarTabela(filtrados);

});

window.editarServico =
  editarServico;

window.deletarServico =
  deletarServico;

carregarServicos();