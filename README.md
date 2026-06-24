# 💲 Conversor de Criptomoedas em Tempo Real

**🎯 O que é o projeto?**  
<br>
Um conversor de criptomoedas dinâmico que consome dados em tempo real diretamente da API pública da Binance. Este projeto foi desenvolvido para resolver o problema de consultar cotações de forma rápida, permitindo conversões diretas entre centenas de pares de moedas (como BTC, USDT, BRL, entre outras). 

A aplicação foi construída com duas frentes: uma interface Web intuitiva para o usuário final e uma versão em Linha de Comando (CLI) para execução via terminal.

🔗 **Acesse o projeto online:** [Conversor Web](https://convcriptomoedas.netlify.app/)

## 🚀 Tecnologias Utilizadas
* **JavaScript (ES6+):** Linguagem principal, utilizada tanto no Front-end quanto no Back-end.
* **Node.js:** Ambiente de execução para a versão em interface de linha de comando (CLI).
* **HTML5 e CSS3:** Estruturação e estilização da interface Web.
* **Fetch API:** Para consumo de dados externos de forma assíncrona.

## ✨ Principais Funcionalidades
* **Consumo de API Real:** Integração com a API oficial da Binance [Link para API](https://api2.binance.com/api/v3/ticker/24hr).
* **Cálculo de Razão Cruzada:** Algoritmo que converte qualquer moeda para BTC nos bastidores e depois para a moeda de destino desejada.
* **Multi-ambiente:** O mesmo core lógico aplicado em um ambiente de Browser (DOM) e em um ambiente de Servidor (Node.js/Terminal).
* **Sistema de Fallback:** Tratamento de erros robusto. Se a API da Binance falhar, o sistema consome um arquivo local (`ultimoResultado.json` ou `ultimoResultado.js`) para garantir que a aplicação não quebre.

## 🛠️ Como Executar na sua Máquina

**Para a versão Web:**
1. Clone este repositório.
2. Navegue até a pasta `web`.
3. Abra o arquivo `index.html` em qualquer navegador.

**Para a versão Node.js (Terminal):**
1. Clone este repositório.
2. Certifique-se de ter o Node.js instalado na sua máquina.
3. Navegue até a pasta `nodejs`.
4. Execute o comando: `node index.js`.
5. Siga as instruções que aparecerão no seu terminal.

## 🧠 Aprendizados e Desafios
Este projeto foi um excelente laboratório para consolidar conceitos de programação assíncrona (`async`/`await` e `Promises`). O maior desafio superado foi a manipulação de arrays complexos vindos da API, exigindo o uso de métodos como `filter` e `map` para higienizar os dados antes de apresentar ao usuário, além de lidar com a formatação correta de casas decimais dependendo do tipo da moeda (Fiat vs Cripto).

---

**Desenvolvido por Cibelle Sousa Rodrigues**  
[Conecte-se comigo no LinkedIn](www.linkedin.com/in/cibellerods) 🔗
