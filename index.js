const readline = require('readline')
const process = require('process')

const parametrosDaInterfaceComOUsuario = {
  input: process.stdin,
  output: process.stdout,
}

const interfaceComOUsuario = readline.createInterface(parametrosDaInterfaceComOUsuario)

const dadosDaConversa = {
  entrada:{
    valor: undefined,
    moeda: undefined,
  },
  saida: {
    moeda: undefined
  }
}

interfaceComOUsuario.question(
  'Qual o valor? ',
  function(resposta) {
    dadosDaConversa.entrada.valor = resposta
    interfaceComOUsuario.question(
      'Qual a moeda de entrada? ',
      function(resposta) {
      dadosDaConversa.entrada.moeda = resposta

        interfaceComOUsuario.question(
          'Qual a moeda de saida? ',
          function(resposta) {
            dadosDaConversa.saida.moeda = resposta
            interfaceComOUsuario.close()
          }
        )
      }
    )
  }
)
