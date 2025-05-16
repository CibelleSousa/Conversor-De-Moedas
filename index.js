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
    dadosDaConversa.entrada.valor =  parseFloat(await perguntar('Qual o valor? '))
    dadosDaConversa.entrada.moeda = await perguntar('Qual a moeda de entrada? ')
    dadosDaConversa.saida.moeda = await perguntar('Qual a moeda de saída? ')
}

async function receberDadosApiBinance() {
  const fs = require('fs')
  const arquivoDoUltimoResultado = __dirname + '/ultimoResultado.json'
  try{
    const url = 'https://api2.binance.com/api/v3/ticker/24hr'
    const resposta = await fetch(url)
    const json = await resposta.json()
    fs.writeFileSync(arquivoDoUltimoResultado, JSON.stringify(json, null, 2))
    return json
  } catch(erro){
    const ultimoResultado = fs.readFileSync(arquivoDoUltimoResultado).toString()
    const json = JSON.parse(ultimoResultado)
    return json
  }
}

async function main() {
  console.info('\n     Conversor de Moedas $')
  console.info('-------------------------------')
  await receberParametrosDoUsuario()
  await receberDadosApiBinance()
  console.info('\n\nFim do programa! Volte sempre.\n\n')  
}

main()