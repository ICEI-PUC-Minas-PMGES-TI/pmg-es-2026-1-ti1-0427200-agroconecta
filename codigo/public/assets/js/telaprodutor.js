

const API_URL = "http://localhost:3000/produtores/produtor_001"


// elementos html

// perfil
const fotoProdutor = document.getElementById("foto-produtor")
const nomeProdutor = document.getElementById("nome-produtor")
const localizacaoProdutor = document.getElementById("localizacao-produtor")
const idadeProdutor = document.getElementById("idade-produtor")
const descricaoProdutor = document.getElementById("descricao-produtor")

// estatisticas
const mediaAvaliacao = document.getElementById("media-avaliacao")
const totalAvaliacoes = document.getElementById("total-avaliacoes")
const badgeMediaAvaliacao = document.getElementById("badge-media-avaliacao")

// producao
const tipoProducao = document.getElementById("tipo-producao")
const culturas = document.getElementById("culturas")
const tamanhoProducao = document.getElementById("tamanho-producao")

// localizaçao
const cidadeEstado = document.getElementById("cidade-estado")
const descricaoLocalizacao = document.getElementById("descricao-localizacao")

// necessidade/avaliacao
const listaNecessidades = document.getElementById("lista-necessidades")
const listaAvaliacoes = document.getElementById("lista-avaliacoes")

// botoes
const btnEditar = document.getElementById("btn-editar")
const btnContatos = document.getElementById("btn-contatos")
const btnChat = document.getElementById("btn-chat")
const btnBuscar = document.getElementById("btn-buscar")
const campoPesquisa = document.getElementById("campo-pesquisa")

// fetch api

async function buscarProdutor() {

    try {

        const resposta = await fetch(API_URL)

        const produtor = await resposta.json()

        console.log("Dados recebidos:", produtor)

        renderizarPerfil(produtor)

    } catch (erro) {

        console.error("Erro ao buscar produtor:", erro)

    }

}

// renderizar perfil

function renderizarPerfil(produtor) {


    fotoProdutor.src = produtor.perfil.foto

    nomeProdutor.textContent =
        produtor.perfil.nome

    localizacaoProdutor.textContent =
        `${produtor.producao.tipo} • ${produtor.localizacao.cidade} - ${produtor.localizacao.estado}`

    idadeProdutor.textContent =
        `${produtor.perfil.idade} anos`

    descricaoProdutor.textContent =
        produtor.perfil.descricao



    mediaAvaliacao.textContent =
        `${produtor.avaliacoes.media} ⭐`

    totalAvaliacoes.textContent =
        produtor.avaliacoes.total

    badgeMediaAvaliacao.textContent =
        `Média: ${produtor.avaliacoes.media} ⭐`



    tipoProducao.textContent =
        produtor.producao.tipo

    culturas.textContent =
        produtor.producao.culturas.join(", ")

    tamanhoProducao.textContent =
        `${produtor.producao.tamanho} hectares`



    cidadeEstado.textContent =
        `${produtor.localizacao.cidade} - ${produtor.localizacao.estado}`

    descricaoLocalizacao.textContent =
        produtor.localizacao.descricao


    renderizarNecessidades(produtor.necessidades)


    renderizarAvaliacoes(produtor.avaliacoes.itens)