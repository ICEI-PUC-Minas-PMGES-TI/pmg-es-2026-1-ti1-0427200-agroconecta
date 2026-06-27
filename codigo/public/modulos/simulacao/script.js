function calcular() {
  var total = Number(document.getElementById("valorTotal").value)
  var entrada = Number(document.getElementById("entrada").value)
  var parcelas = Number(document.getElementById("parcelas").value)
  var juros = Number(document.getElementById("juros").value)

  if (total == 0 || parcelas == 0) {
    alert("Preencha pelo menos o valor total e o número de parcelas!")
    return
  }

  var restante = total - entrada
  var comJuros = restante + (restante * juros / 100)
  var valorParcela = comJuros / parcelas

  var resultado = document.getElementById("resultado")
  resultado.style.display = "block"

  resultado.innerHTML =
    "<p>Valor total: <strong>R$ " + total.toFixed(2) + "</strong></p>" +
    "<p>Entrada: <strong>R$ " + entrada.toFixed(2) + "</strong></p>" +
    "<p>Juros (" + juros + "%): <strong>R$ " + (restante * juros / 100).toFixed(2) + "</strong></p>" +
    "<p>Total com juros: <strong>R$ " + comJuros.toFixed(2) + "</strong></p>" +
    "<p>Parcelas: <strong>" + parcelas + "x de R$ " + valorParcela.toFixed(2) + "</strong></p>"
}