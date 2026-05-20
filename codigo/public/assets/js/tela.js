const API_URL = "http://localhost:3000/tecnicos";

const listaTecnicos = document.getElementById("lista-tecnicos");

const perfilTecnico = document.getElementById("perfil-tecnico");

const tituloAvaliacao = document.getElementById("titulo-avaliacao");

async function carregarTecnicos() {

  const response = await fetch(API_URL);

  const tecnicos = await response.json();

  renderizarCards(tecnicos);

  renderizarPerfil(tecnicos[0].id);
}

function renderizarCards(tecnicos) {

  listaTecnicos.innerHTML = "";

  tecnicos.forEach((tecnico) => {

    listaTecnicos.innerHTML += `

      <div class="col-md-4">

        <div class="card h-100 shadow-sm p-3">

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

            <span>
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

  window.tecnicos = tecnicos;
}

function renderizarPerfil(id) {

  const tecnico =
    window.tecnicos.find((t) => t.id === id);

  tituloAvaliacao.innerText =
    `Avaliar ${tecnico.nome}`;

  const avaliacoes =
    tecnico.perfilCompleto.avaliacoesClientes
      .map((avaliacao) => {

        return `

          <div class="border rounded p-3 mb-3">

            <strong>
              ${avaliacao.cliente}
            </strong>

            <p class="mb-1">
              ⭐⭐⭐⭐⭐
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

        ${tecnico.iniciais}

      </div>

      <div>

        <h2 class="fw-bold">
          ${tecnico.nome}
        </h2>

        <span class="badge bg-success">
          ${tecnico.especialidade}
        </span>

        <p class="mt-2">
          ⭐ ${tecnico.avaliacao}
        </p>

      </div>

    </div>

    <p>
      ${tecnico.perfilCompleto.biografia}
    </p>

    <h4 class="fw-bold mt-5 mb-4">
      Avaliações dos Clientes
    </h4>

    ${avaliacoes}

    <div class="d-flex gap-3 mt-4">

      <button class="btn btn-success">
        Entrar em Contato
      </button>

      <button class="btn btn-outline-success">
        Deixar Avaliação
      </button>

    </div>
  `;
}

carregarTecnicos();


