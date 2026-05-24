function calcular() {

    let total = document.getElementById("valorTotal").value;
    let entrada = document.getElementById("entrada").value;
    let parcelas = document.getElementById("parcelas").value;
    let juros = document.getElementById("juros").value;

    total = Number(total);
    entrada = Number(entrada);
    parcelas = Number(parcelas);
    juros = Number(juros);


    let simulacao = {

        valorTotal: total,
        valorEntrada: entrada,
        numeroParcelas: parcelas,
        taxaJuros: juros

    };

    let conta = total - entrada;

    conta = conta + (conta * juros / 100);

    conta = conta / parcelas;

    document.getElementById("resultado").innerHTML =
        "Parcelas de R$ " + conta.toFixed(2);

    console.log(simulacao);

}