const API_URL = "http://localhost:3000/tecnicos";

const listaTecnicos =
  document.getElementById("lista-tecnicos");

const perfilTecnico =
  document.getElementById("perfil-tecnico");

const tituloAvaliacao =
  document.getElementById("titulo-avaliacao");

const comentarioInput =
  document.getElementById("comentario");

const btnAvaliar =
  document.getElementById("btn-avaliar");

const estrelas =
  document.querySelectorAll("#estrelas span");

const campoBusca =
  document.getElementById("campo-busca");

let notaSelecionada = 0;

let tecnicoAtual = null;

/* CARREGAR */

async function carregarTecnicos() {

  const response =
    await fetch(API_URL);

  const tecnicos =
    await response.json();

  window.tecnicos = tecnicos;

  renderizarCards(tecnicos);

  renderizarPerfil(tecnicos[0].id);
}

/* CARDS */

function renderizarCards(tecnicos) {

  listaTecnicos.innerHTML = "";

  tecnicos.forEach((tecnico) => {

    listaTecnicos.innerHTML += `

      <div class="col-md-4">

        <div class="card h-100 shadow-sm p-3 border-0">

          <div class="d-flex align-items-center gap-3">

            <div
              class="bg-success text-white rounded-circle d-flex justify-content-center align-items-center"
              style="
                width:70px;
                height:70px;
                font-weight:bold;
                font-size:24px;
              "
            >

              ${tecnico.iniciais}

            </div>

            <div>

              <h5 class="fw-bold">
                ${tecnico.nome}
              </h5>

              <span class="badge bg-success">
                ${tecnico.especialidade}
              </span>

            </div>

          </div>

          <p class="mt-3">
            ${tecnico.descricao}
          </p>

          <div class="mt-auto d-flex justify-content-between align-items-center">

            <span class="fw-bold text-warning">
              ⭐ ${tecnico.avaliacao}
            </span>

            <button
              class="btn btn-success"
              onclick="renderizarPerfil(${tecnico.id})"
            >

              Ver Perfil

            </button>

          </div>

        </div>

      </div>
    `;
  });
}

/* PERFIL */

function renderizarPerfil(id) {

  tecnicoAtual =
    window.tecnicos.find((t) => t.id === id);

  tituloAvaliacao.innerText =
    `Avaliar ${tecnicoAtual.nome}`;

  const avaliacoes =
    tecnicoAtual.perfilCompleto.avaliacoesClientes
      .map((avaliacao, index) => {

        return `

          <div class="border rounded p-3 mb-3 shadow-sm">

            <div class="d-flex justify-content-between align-items-center gap-2">

              <strong>
                ${avaliacao.cliente}
              </strong>

              <div class="d-flex gap-2">

  <button
    class="btn btn-warning btn-sm"
    onclick="editarAvaliacao(${index})"
  >
    Editar
  </button>

  <button
    class="btn btn-danger btn-sm"
    onclick="deletarAvaliacao(${index})"
  >
    Excluir
  </button>

</div>

            </div>

            <p class="mb-1 mt-2">
              ${"⭐".repeat(avaliacao.nota)}
            </p>

            <p>
              ${avaliacao.comentario}
            </p>

          </div>
        `;
      })
      .join("");

  perfilTecnico.innerHTML = `

    <div class="d-flex align-items-center gap-4 mb-4">

      <div
        class="bg-success text-white rounded-circle d-flex justify-content-center align-items-center"
        style="
          width:100px;
          height:100px;
          font-size:32px;
          font-weight:bold;
        "
      >

        ${tecnicoAtual.iniciais}

      </div>

      <div>

        <h2 class="fw-bold">
          ${tecnicoAtual.nome}
        </h2>

        <span class="badge bg-success">
          ${tecnicoAtual.especialidade}
        </span>

        <p class="mt-2 fw-bold text-warning">
          ⭐ ${tecnicoAtual.avaliacao}
        </p>

      </div>

    </div>

    <p>
      ${tecnicoAtual.perfilCompleto.biografia}
    </p>

    <h4 class="fw-bold mt-5 mb-4">
      Avaliações dos Clientes
    </h4>

    ${avaliacoes}
  `;
}

/* ESTRELAS */

estrelas.forEach((estrela) => {

  estrela.addEventListener("click", () => {

    notaSelecionada =
      estrela.dataset.nota;

    estrelas.forEach((e) => {
      e.style.opacity = "0.3";
    });

    for(let i = 0; i < notaSelecionada; i++) {
      estrelas[i].style.opacity = "1";
    }

  });

});

/* CRIAR AVALIAÇÃO */

btnAvaliar.addEventListener("click", async () => {

  if(
    comentarioInput.value === "" ||
    notaSelecionada == 0
  ){
    alert("Preencha comentário e nota!");
    return;
  }

  tecnicoAtual.perfilCompleto.avaliacoesClientes.push({

    cliente: "Usuário",

    nota: Number(notaSelecionada),

    comentario: comentarioInput.value

  });

  await fetch(`${API_URL}/${tecnicoAtual.id}`, {

    method: "PUT",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(tecnicoAtual)

  });

  comentarioInput.value = "";

  notaSelecionada = 0;

  estrelas.forEach((e) => {
    e.style.opacity = "1";
  });

  carregarTecnicos();

  alert("Avaliação enviada!");

});

/* DELETE */

async function deletarAvaliacao(index) {

  tecnicoAtual
    .perfilCompleto
    .avaliacoesClientes
    .splice(index, 1);

  await fetch(`${API_URL}/${tecnicoAtual.id}`, {

    method: "PUT",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(tecnicoAtual)

  });

  carregarTecnicos();

}

/* BUSCA */

campoBusca.addEventListener("input", () => {

  const valor =
    campoBusca.value.toLowerCase();

  const filtrados =
    window.tecnicos.filter((tecnico) => {

      return (
        tecnico.nome
          .toLowerCase()
          .includes(valor)
      );

    });

  renderizarCards(filtrados);

});

/* START */

carregarTecnicos();
async function editarAvaliacao(index){

  const novoComentario =
    prompt("Digite o novo comentário:");

  if(!novoComentario) return;

  tecnicoAtual
    .perfilCompleto
    .avaliacoesClientes[index]
    .comentario = novoComentario;

  await fetch(`${API_URL}/${tecnicoAtual.id}`, {

    method: "PUT",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(tecnicoAtual)

  });

  carregarTecnicos();

  alert("Avaliação editada!");

}
window.editarAvaliacao = editarAvaliacao;
window.deletarAvaliacao = deletarAvaliacao;
window.renderizarPerfil = renderizarPerfil;