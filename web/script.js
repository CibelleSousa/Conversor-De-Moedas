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

async function receberParametrosDoUsuario() {
    dadosDaConversa.entrada.valor =  document.querySelector('.entrada .valor').value 
    dadosDaConversa.entrada.moeda = document.querySelector('.entrada .moeda').value
    dadosDaConversa.saida.moeda = document.querySelector('.saida .moeda').value
}

async function receberDadosApiBinance() {
  try{
    const url = 'https://api2.binance.com/api/v3/ticker/24hr'
    const resposta = await fetch(url)
    const json = await resposta.json()
    return json
  } catch(erro){
    return window.cotacaoDasMoedasPadrao
  }
}

async function tratarDadosDaApi() {
  if (dadosDaConversa.cotacoes,length > 0){
    return
  }
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
  const valorDeEntrada = parseFloat(dadosDaConversa.entrada.valor)
  const moedaDeEntrada = (dadosDaConversa.entrada.moeda || 'BTC').toUpperCase()
  const moedaDeSaida = (dadosDaConversa.saida.moeda || 'USDT').toUpperCase()

  if(isNaN(valorDeEntrada)){
    console.error(`ERRO: Valor de entrada deve ser numérico.`)
    return
  }

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

  document.querySelector('.saida .valor').value = valorDeSaida
}
function preencherMoeadasNaLista(select, moedas){
    const selecao = select.value
    select.innerHTML = ''
    moedas.forEach(moeda => {
        const option = document.createElement('option')
        option.value = moeda
        option.innerHTML = moeda
        select.appendChild(option)
    })
    select.value = selecao
}

function preencherMoeadas(){
    let moedas = dadosDaConversa.cotacoes.map(cotacao => cotacao.moeda)
    moedas.push('BTC')
    moedas = moedas.filter(moeda => moeda !== '').sort()

    preencherMoeadasNaLista(document.querySelector('.entrada .moeda'), moedas)
    preencherMoeadasNaLista(document.querySelector('.saida .moeda'), moedas)
}


async function main() {
  await tratarDadosDaApi()
  preencherMoeadas()
  await receberParametrosDoUsuario()
  await calcularConversao()
  
}

main()