# PlayOnMatch

## Como executar?
<p aling="left">Instale o visual code studio ou qualquer outro editor de código disponivel</p>
<p aling="left">Entre na pasta do repositorio "TCC", abra com o visual code a pasta "PlayOnMatch"</p>
<p aling="left">Com o visual code aberto, abra o cmd do visual code, digite: cd back, npm install</p>
<p aling="left">Ainda no cmd do back, faça: npx prisma migrate dev --name init</p>
<p aling="left">Crie um arquivo na pasta back com o nome ".env" e dentro desse arquivo digite: mysql://SEUUSER:SENHA@HOST:SUAPORTA/SEUBANCO</p>
<p aling="left">Exemplo oficial:</p>
 - [.env no prisma.io](https://www.prisma.io/docs/concepts/database-connectors/mysql)
<p aling="left">Para executar o backend, faça: nodemon ou node index.js</p>
<p aling="left">Abra outro cmd no visual code e digite: cd mobile, cd playonmatch, npm install e yarn install</p>
<p aling="left">Para executar digite: npx expo start --web, e está pronto</p>
