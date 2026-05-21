const demandas = JSON.parse(localStorage.getItem("demandas")) || [

{
    titulo: "Praga na plantação",
    descricao: "Insetos atacando a lavoura",
    localizacao: "Uberlândia - MG",
    tipo: "Controle de pragas"
},

{
    titulo: "Solo com baixa produtividade",
    descricao: "Necessário análise de solo",
    localizacao: "Patos de Minas - MG",
    tipo: "Análise de solo"
}

];

const listaDemandas = document.getElementById("lista-demandas");
const contador = document.getElementById("contador");

const formulario = document.getElementById("form-demanda");

const inputTitulo = document.getElementById("titulo");
const inputDescricao = document.getElementById("descricao");
const inputTipo = document.getElementById("tipo");
const inputLocalizacao = document.getElementById("localizacao");

let editandoIndex = null;

function salvarLocalStorage(){

localStorage.setItem(
    "demandas",
    JSON.stringify(demandas)
);

}

function renderizarDemandas(){

listaDemandas.innerHTML = "";

demandas.forEach((demanda, index) => {

    listaDemandas.innerHTML += `

    <div class="card">

        <div class="card-top">

        <div>

            <h3>${demanda.titulo}</h3>

            <p class="localizacao">
            ${demanda.localizacao}
            </p>

            <p style="margin-top:10px;">
            ${demanda.descricao}
            </p>

        </div>

        <span class="tipo">
            ${demanda.tipo}
        </span>

        </div>

        <div class="card-buttons">

        <button 
            class="btn-blue"
            onclick="editarDemanda(${index})"
        >
            Editar
        </button>

        <button 
            class="btn-red"
            onclick="excluirDemanda(${index})"
        >
            Excluir
        </button>

        </div>

    </div>

    `;
});

contador.innerText = `${demandas.length} demandas`;

salvarLocalStorage();
}

formulario.addEventListener("submit", function(event){

event.preventDefault();

const novaDemanda = {

    titulo: inputTitulo.value,

    descricao: inputDescricao.value,

    tipo: inputTipo.value,

    localizacao: inputLocalizacao.value
};

if(editandoIndex === null){

    demandas.push(novaDemanda);

} else {

    demandas[editandoIndex] = novaDemanda;

    editandoIndex = null;
}

renderizarDemandas();

formulario.reset();
});

function excluirDemanda(index){

demandas.splice(index, 1);

renderizarDemandas();
}

function editarDemanda(index){

const demanda = demandas[index];

inputTitulo.value = demanda.titulo;

inputDescricao.value = demanda.descricao;

inputTipo.value = demanda.tipo;

inputLocalizacao.value = demanda.localizacao;

editandoIndex = index;

}

renderizarDemandas();