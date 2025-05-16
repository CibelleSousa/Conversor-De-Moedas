const dadosDaConversa = {
  cotacoes: [],
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

async function tratarDadosDaApi() {
  const moedas = await receberDadosApiBinance()

  const paraBTC = moedas
    .filter(cotacoes =>cotacoes.symbol.endsWith('BTC'))
    .map(cotacoes => ({
      moeda: cotacoes.symbol.substring(0, cotacoes.symbol.indexOf('BTC')),
      valor: parseFloat(cotacoes.lastPrice)
    }))

  const deBTC = moedas
    .filter(cotacoes => cotacoes.symbol.startsWith('BTC'))
    .map(cotacoes => ({
      moeda: cotacoes.symbol.substring(3),
      valor : 1 / parseFloat(cotacoes.lastPrice)
    }))
  
  dadosDaConversa.cotacoes = [
    ...paraBTC,
    ...deBTC,
  ]
}

async function calcularConversao() {
  const valorDeEntrada = dadosDaConversa.entrada.valor
  const moedaDeEntrada = (dadosDaConversa.entrada.moeda || 'BTC').toUpperCase()
  const moedaDeSaida = (dadosDaConversa.saida.moeda || 'USDT').toUpperCase()

  if(isNaN(valorDeEntrada)){
    console.error(`ERRO: Valor de entrada deve ser numérico.`)
    return
  }
  
  await tratarDadosDaApi()

  const cotacaoDaMoedaDeEntradaParaBtc = moedaDeEntrada === 'BTC' ? 1 : dadosDaConversa.cotacoes.find(cotacao => cotacao.moeda === moedaDeEntrada)?.valor
  if(cotacaoDaMoedaDeEntradaParaBtc === undefined){
    console.error(`ERRO: Moeda não existe "${moedaDeEntrada}".`)
  }

  const cotacaoDaMoedaDeSaidaParaBtc = moedaDeSaida === 'BTC' ? 1 : dadosDaConversa.cotacoes.find(cotacao => cotacao.moeda === moedaDeSaida)?.valor
  if(cotacaoDaMoedaDeSaidaParaBtc === undefined){
    console.error(`ERRO: Moeda não existe "${moedaDeSaida}".`)
  }

  if(cotacaoDaMoedaDeEntradaParaBtc === undefined || cotacaoDaMoedaDeSaidaParaBtc === undefined){
    return
  }

  const razao = cotacaoDaMoedaDeEntradaParaBtc / cotacaoDaMoedaDeSaidaParaBtc
  const valorDeSaida = valorDeEntrada * razao

  const valorDeEntradaDecimais = moedaDeEntrada.includes('USD') || moedaDeEntrada.includes('BRL') ? 2 : 8
  const valorDeSaidaDecimais = moedaDeSaida.includes('USD') || moedaDeSaida.includes('BRL') ? 2 : 8

  console.log(`\nRESULTADO: ${valorDeEntrada.toFixed(valorDeEntradaDecimais)} ${moedaDeEntrada} -> ${valorDeSaida.toFixed(valorDeSaidaDecimais)} ${moedaDeSaida}`)
}

async function main() {
  console.info('\n     Conversor de Moedas $')
  console.info('-------------------------------')
  await receberParametrosDoUsuario()
  await calcularConversao()
  console.info('\n\nFim do programa! Volte sempre.\n\n')  
}

main()