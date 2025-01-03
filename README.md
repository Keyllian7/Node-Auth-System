# Node-Auth-System

Sistema básico de autenticação de usuários desenvolvido em Node.js, com funcionalidades de registro (register) e login. Inclui a criação de contas, armazenamento seguro de senhas, validação de credenciais e autenticação. Ideal como ponto de partida para projetos que necessitem de um sistema de gerenciamento de usuários.

## Funcionalidades

- Registro de novos usuários
- Login de usuários
- Listagem de usuários (apenas para administradores)
- Atualização de informações de usuários
- Remoção de usuários
- Proteção de rotas com autenticação JWT
- Limitação de taxa de requisições
- Sanitização de entradas para evitar XSS
- Documentação da API com Swagger

## Tecnologias Utilizadas

- Node.js
- Express
- Mongoose
- JWT (JSON Web Token)
- Joi (validação)
- Bcrypt (hashing de senhas)
- Helmet (segurança)
- XSS-Clean (sanitização)
- Express-Rate-Limit (limitação de taxa)
- Swagger (documentação da API)

## Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/node-auth-system.git
    ```

2. Navegue até o diretório do projeto:
    ```sh
    cd node-auth-system
    ```

3. Instale as dependências:
    ```sh
    npm install
    ```

4. Crie um arquivo [.env](http://_vscodecontentref_/0) na raiz do projeto e adicione as seguintes variáveis de ambiente:
    ```env
    PORT=8081
    JWT_PASSWORD=sua_senha_jwt
    DATABASE_URL=sua_url_do_banco_de_dados
    NODE_URL=development
    ```

5. Inicie o servidor:
    ```sh
    npm start
    ```

## Endpoints da API

### Autenticação

- **POST /auth/register**: Registra um novo usuário.
- **POST /auth/login**: Realiza o login de um usuário.

### Usuários

- **GET /user/list**: Lista todos os usuários (apenas para administradores).
- **PATCH /user/update/:id**: Atualiza as informações de um usuário.
- **DELETE /user/remove/:id**: Remove um usuário.

## Documentação da API

A documentação da API está disponível em `/api-docs` após iniciar o servidor. Ela é gerada automaticamente pelo Swagger.

## Testes

Para rodar os testes, utilize o comando:
    ```
    npm test
    ```
## Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Autor
Keyllian Azevedo
