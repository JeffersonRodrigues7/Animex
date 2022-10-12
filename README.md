# <center>Animex</center>

## Descrição

Animex é o projeto de um fórum que une pessoas com interesses comuns em comunidades, a ideia advém principalmente das comunidades do falecido Orkut. Utilizando ferramentas de desenvolvimento web têm-se o objetivo de criar um site seguro, rápido, funcional, atrativo e responsivo.

## Funcionalidades

**- Registro de Usuário**
![Registro de usuário](https://i.imgur.com/SXaK1Tk.gif)

**- Login de Usuário**
Após o sucesso no login um **token de autorização jwt** será gerado e informado para o usuário, ele deverá ser enviado em toda requisição para o servidor.
![Login de usuário](https://i.imgur.com/GrLFazX.gif)

**- Criação de tópico e comentário**
Os tópicos são listados em ordem decrescente de atualização, ou seja, o último tópico a ser atualizado com um comentário estará no topo na listagem de tópicos.
![Criação de tópico e comentário](https://i.imgur.com/MPcs5Ft.gif)

**- Atualização da foto de perfil**
![Atualização da foto de perfil](https://i.imgur.com/lhDSlZ4.gif)

**- Atualização de comentários em tempo real**
Os comentários serão atualizados em tempo real sempre que o usuário estiver na **última** página do tópico.
![Atualização de comentários em tempo real](https://i.imgur.com/mJ8X7Ig.gif)

**- Incorporação de redes sociais**
Atualmente vídeos do youtube, posts do instagram, status do twitter e imagens são incorporados automaticamente no comentário, o restante das urls são mostradas como links.
![Incorporação de redes sociais](https://i.imgur.com/7xqcTH0.gif)

**- Site responsivo**
![Site responsivo](https://i.imgur.com/aXNOZxA.gif)

## Tecnologias utilizadas

- VSCode
- Typescript
- NodeJS
- MySQL & Sequelize
- React
- HTML & CSS
- Bootstrap

## Rodando o projeto

OBS: Por segurança, os dados de porta, nome do banco de dados, host e outras informações utilizadas no projeto foram colocados em um arquivo .env. Para que o programa funcione corretamente é necessário informar esses dados nos arquivos db-connection.ts, server.ts, serverSocket.ts e jwtConfig.ts.

**Iniciando servidor**

- cd back
- npm install
- npm start

**Iniciando serverSocket**

- cd back
- nodemon .\\src\\serverSocket.ts

**Iniciando front**

- cd front
- npm install
- npm start

## Implementações futuras

- **Mudança na caixa de mensagem**: Fazer com que as incorporações de imagens ocorram durante a escrita da mensagem.
- **Quote/Citação**: Basicamente o usuário poderá citar um comentário de outro usuário.
- **Segurança**: Criar verificação por e-mail, armazenamento criptografado de sessão, etc...
- **Notificações**: Sistema que notifica os usuários quando ele for citado ou alguém responder um tópico que foi criado por ele.
- **Sistema de nivelamento de usuário**: Criar um sistema que permita adicionar moderadores com acessos específicos dentro das comunidades.
- **Criação dinâmica de comunidades**: Atualmente temos uma única comunidade, futuramente os usuários poderão crias suas próprias comunidades e gerenciá-las da forma que preferir.
- **Mais configurações de usuário**: Permitir que o usuário possa alterar e-mail, nome de usuário, biografia, entre outras...
- **Amizades**: Fazer com que os usuários possam se adicionar como amigos
- **Tela de loading**: Adicionar um tela de loading até que o conteúdo de uma página seja carregado por completo.
- **Tratamento de imagens**: Tratamento de imagens antes de enviar elas para o banco de dados.
- **Design**: Criar um design mais bonito e chamativo para o site.
