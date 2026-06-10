var profissionalAtual = null

var profissionais = [
  {
    nome: "João Pedro",
    profissao: "Agrônomo",
    especialidade: "Cultivo de soja e milho",
    avaliacoes: []
  },
  {
    nome: "Mariana Alves",
    profissao: "Agrônoma",
    especialidade: "Manejo de solos e irrigação",
    avaliacoes: []
  },
  {
    nome: "Carlos Silva",
    profissao: "Agrônomo",
    especialidade: "Controle de pragas",
    avaliacoes: []
  }
]

trocarProfissional("João Pedro")

function trocarProfissional(nome) {
  for (var i = 0; i < profissionais.length; i++) {
    if (profissionais[i].nome == nome) {
      profissionalAtual = profissionais[i]
    }
  }

  mostrarInfoProfissional()
  mostrarAvaliacoes()
}

function mostrarInfoProfissional() {
  var div = document.getElementById("informacoesProfissional")

  div.innerHTML = "<h2>" + profissionalAtual.nome + "</h2>" +
    "<p>Profissão: " + profissionalAtual.profissao + "</p>" +
    "<p>Especialidade: " + profissionalAtual.especialidade + "</p>"
}

function mostrarAvaliacoes() {
  var div = document.getElementById("listaAvaliacoes")
  div.innerHTML = ""

  if (profissionalAtual.avaliacoes.length == 0) {
    div.innerHTML = "<p>Nenhuma avaliação ainda.</p>"
    return
  }

  for (var i = 0; i < profissionalAtual.avaliacoes.length; i++) {
    var av = profissionalAtual.avaliacoes[i]
    var card = document.createElement("div")
    card.className = "card-avaliacao"

    card.innerHTML = "<h3>" + av.usuario + "</h3>" +
      "<p>Nota: " + av.nota + "/10</p>" +
      "<p>" + av.comentario + "</p>"

    div.appendChild(card)
  }
}

function adicionarAvaliacao() {
  var nome = document.getElementById("usuario").value
  var nota = document.getElementById("nota").value
  var comentario = document.getElementById("comentario").value

  if (nome == "" || nota == "" || comentario == "") {
    alert("Preencha todos os campos!")
    return
  }

  profissionalAtual.avaliacoes.push({
    usuario: nome,
    nota: Number(nota),
    comentario: comentario
  })

  mostrarAvaliacoes()

  document.getElementById("usuario").value = ""
  document.getElementById("nota").value = ""
  document.getElementById("comentario").value = ""
}