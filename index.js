const readline = require('node: readline')
const process = require('node: process')

const parametrosDaInterfaceComOUsuario = {
  input: process.stdin,
  output: process.stdout,
}

const interfaceComOUsuario = readline.createInterface(parametrosDaInterfaceComOUsuario)

const dadosDaConverso = {
  entrada:{
    valor: undefined,
    moeda: undefined,
  },
  saida:{
    moeda: undefined
  }
}

const interfaceComOUsuario.question(
  'Qual o valor? ',
  function(resposta) {
    dadosDaConversa.entrada.valor = resposta

    const interfaceComOUsuario.question(
      'Qual a moeda de entrada? ',
      function(resposta) {
        dadosDaConversa.entrada.moeda = resposta

        const interfaceComOUsuario.question(
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
