<div align="center">
<h1>projeto21-singmeasong</h1>
<p>Implementação de testes integrados, ponta a ponta e unitários com jest/supertest, cypress.</p>
<div align="center" style="display: flex">
  <img align="center" alt="React" height="30" width="90" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
  <img align="center" alt="React" height="30" width="90" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge">
  <img align="center" alt="React" height="30" width="100" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img align="center" alt="React" height="30" width="100" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
  <img align="center" alt="React" height="30" width="90" src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white">
  <img align="center" alt="React" height="30" width="90" src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white">
</div>
</div>
<br>
<h2>Instalando projeto</h2>
<p>No terminal, executar o comando:</p>
<code>git clone https://github.com/Adamantyne/projeto21-singmeasong.git</code>
<h2>Rodando projeto</h2>
<p>Abra a pasta do projeto (projeto21-singmeasong) e instale as dependências:</p>
<code>npm i</code>
<hr>
<p>Apos isso, na pasta "back-end",configure o banco de desenvolvimento e inicialize o servidor local:</p>
<code>npx prisma migrate dev</code>
<br>
<code>npx prisma generate</code>
<br>
<code>npm run dev</code>
<hr>
<p>Por fim, na pasta "front-end", inicialize o front no browser:</p>
<code>npm start</code>
<br>
<h2>Testes unitários</h2>
<p>Execute, no "back-end", o segunte comando:</p>
<code>npm run test:unit</code>
<br>
<h2>Testes de integração</h2>
<p>Execute, no "back-end", o segunte comando:</p>
<code>npm test</code>
<br>
<h2>Testes "end to end"</h2>
<p>No "back-end", inicialize o servidor de testes local:</p>
<code>npm run dev:test</code>
<hr>
<p>Execute, no "front-end", o segunte comando:</p>
<code>npm start</code>
<hr>
<p>Com o front aberto no browser, inicie o cypress:</p>
<code>npx cypress open</code>
<hr>
<p>Escolha a opção "e2e" para os testes e o navegador de preferência para executa-los.</p>
<p>Na interface do cypress, execute o arquivo do diretório "cypress/e2e/e2e.cy.js".</p>
