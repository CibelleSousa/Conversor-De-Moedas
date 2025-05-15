const dadosDaConversa = {
  entrada:{
    valor: undefined,
    moeda: undefined,
  },
  saida: {
    moeda: undefined
  }
}

async function perguntar(pergunta) {
  return new Promise(function(retornar){
    const readline = require('readline')
    const process = require('process')

    const parametrosDaInterfaceComOUsuario = {
      input: process.stdin,
      output: process.stdout,
    }

    const interfaceComOUsuario = readline.createInterface(parametrosDaInterfaceComOUsuario)
    
    interfaceComOUsuario.question(
      pergunta,
      function(resposta){
        retornar(resposta)
        interfaceComOUsuario.close()
      }
    )
  })
}

async function receberParametrosDoUsuario() {
    dadosDaConversa.entrada.valor = await perguntar('Qual o valor? ')
    dadosDaConversa.entrada.moeda = await perguntar('Qual a moeda de entrada? ')
    dadosDaConversa.saida.moeda = await perguntar('Qual a moeda de saída? ')
}

receberParametrosDoUsuario()