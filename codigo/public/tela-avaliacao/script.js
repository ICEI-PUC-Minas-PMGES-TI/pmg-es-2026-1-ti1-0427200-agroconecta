var idAtual = 1

trocarProfissional(1)

function trocarProfissional(id) {
  idAtual = Number(id)

  fetch("http://localhost:3000/profissionais/" + idAtual)
    .then(function(r) { return r.json() })
    .then(function(prof) {
      document.getElementById("informacoesProfissional").innerHTML =
        "<h2>" + prof.nome + "</h2>" +
        "<p>Profissão: " + prof.profissao + "</p>" +
        "<p>Especialidade: " + prof.especialidade + "</p>"
    })

  atualizarLista()
}

function atualizarLista() {
  fetch("http://localhost:3000/avaliacoes?profissionalId=" + idAtual)
    .then(function(r) { return r.json() })
    .then(function(lista) {
      var div = document.getElementById("listaAvaliacoes")
      div.innerHTML = ""

      if (lista.length == 0) {
        div.innerHTML = "<p>Nenhuma avaliação ainda.</p>"
        return
      }

      for (var i = 0; i < lista.length; i++) {
        var av = lista[i]
        var card = document.createElement("div")
        card.className = "card-avaliacao"

        card.innerHTML =
          "<h3>" + av.usuario + "</h3>" +
          "<p>Nota: " + av.nota + "/10</p>" +
          "<p>" + av.comentario + "</p>"

        var btnApagar = document.createElement("button")
        btnApagar.className = "btn-apagar"
        btnApagar.textContent = "Apagar"
        btnApagar.onclick = function(avId) {
          return function() { apagar(avId) }
        }(av.id)

        card.appendChild(btnApagar)
        div.appendChild(card)
      }
    })
}

function apagar(id) {
  fetch("http://localhost:3000/avaliacoes/" + id, {
    method: "DELETE"
  })
  .then(function() {
    atualizarLista()
  })
}

function adicionarAvaliacao() {
  var nome = document.getElementById("usuario").value
  var nota = document.getElementById("nota").value
  var comentario = document.getElementById("comentario").value

  if (nome == "" || nota == "" || comentario == "") {
    alert("Preencha todos os campos!")
    return
  }

  fetch("http://localhost:3000/avaliacoes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      profissionalId: idAtual,
      usuario: nome,
      nota: Number(nota),
      comentario: comentario
    })
  })
  .then(function() {
    document.getElementById("usuario").value = ""
    document.getElementById("nota").value = ""
    document.getElementById("comentario").value = ""

    atualizarLista()
  })
}