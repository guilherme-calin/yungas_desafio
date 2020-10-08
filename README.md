# yungas_desafio
Repositório do desafio front-end da empresa Yungas de Florianópolis.

O *code challenge* se refere a um sistema web para busca de pessoas a partir de um mock de uma API backend. É possível pesquisar por nome, endereço, cidade e região do país, além de ser possível selecionar a ordenação desejada (alfabética ou alfabética inversa).

### Pré-Requisitos

É necessário instalar o Node.js e NPM para executar este projeto.

### Instruções para Execução

* Clone o repositório;
* Acesse via linha de comando a pasta raiz do projeto clonado em sua máquina;
* Execute o comando ```npm install```;
* Após a instalação das dependências, execute o comando ```npm start``` para testar localmente na máquina,
  por meio da URL ```localhost:3000``` no *browser*.                                                                                                                                                
* Caso queira hospedar o projeto em um servidor, execute o comando ```npm run build``` para
gerar o *build* de produção no diretório ```./build``` do projeto, e sirva o conteúdo no
*backend* de sua preferência. 

### Instruções para Utilização

O sistema inicialmente irá trazer todos os registros de acordo com os filtros padrão. 

A mudança de filtros pode ser realizada nas opções apresentadas ao clicar em **Filtros**. 

**É necessário clicar no botão Buscar ao alterar os filtros para que a nova busca seja realizada**.

É possível apertar a tecla *Enter* do teclado após digitar o texto para realizar a busca.

Ao clicar em uma das pessoas listadas no *card* **Resultados**, será aberta uma janela com mais informações.
Para fechá-la, clique no botão com o ícone da seta para cima.

### Linguagens, Bibliotecas e Frameworks utilizados
* Linguagem de programação Javascript;
* React como *framework* de front end;
* Sass como pré-processador CSS.                                                                      