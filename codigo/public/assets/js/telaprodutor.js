

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