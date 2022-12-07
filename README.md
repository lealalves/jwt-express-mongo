# start

1- npm install  <br>
2 - cd src <br>
3 - node server.js <br>

# rotas

- POST /auth/register: registrar um usuário enviando no corpo da requisição um json com "name", "email" e "password",
retornando os dados que foram registrado no banco de dados e um token de autenticação.

- POST /auth/login: logar com um usuário previamente criado, enviando um json "email" e "password", retornando os dados do usuário e um token.

- GET /admin/users: rota apenas para quem tem um token válido no header authorization.

