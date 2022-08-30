
Projeto feito no módulo de Back-End na instituição de ensino Trybe. 
# [Blogs-Api]()

Uma API e um banco de dados (fornecido pela instituição) para a produção de conteúdo para um blog.
## Apresentação

No que se refere a modelagem de software, percebe-se a vastidão de metodologias dispostas para organização e segurança das aplicações. Baseado nessa premissa e na forma de escrever os testes unitários que essa API foi construída. Nela, vamos ter um CRUD de postagens com uma camada de autenticação de pessoas usuárias. 
Além de tudo isso, tornou-se constante uma reflexão na construção do projeto: "será que essa é a melhor forma de fazer isso?", e foi através desse questionamento que fixei de maneira mais coesa e elaborada todos os conhecimentos necessários para aderência do código à especificação, organização do código e, por fim, a qualidade e a cobertura dos testes.
## Objetivos

- Desenvolver uma aplicação em Node.js usando o pacote sequelize para fazer um CRUD de posts;
- Colocar sob nova ótica o jeito com que os testes são implementados;
- Seguir os princípios do REST no desenvolvimento dos endpoints;


## Como usar
- [Fork o repositório](https://github.com/Italo9/Project-Trybe-Blogs-Api);

- Clone para sua máquina local: `git clone https://github.com/`YourAccount`/Project-Trybe-Blogs-Api.git`;
### Com docker:
- Rode os serviços node e db com o comando `docker-compose up -d –build`
- `docker exec -it blogs_api bash`
- Instale as dependências: `npm install`;
### Sem docker:
- Instale as dependências: `npm install`;
