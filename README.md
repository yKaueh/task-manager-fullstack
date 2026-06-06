# Task Manager Full Stack

Aplicação Full Stack para gerenciamento de tarefas com autenticação JWT, desenvolvida com React, Node.js, Express e MySQL.

## Demonstração

Frontend: https://task-manager-fullstack-rho-lilac.vercel.app/

Backend: https://task-manager-fullstack-ckbo.onrender.com/

## Tecnologias Utilizadas

### Frontend

* React
* React Router
* Vite
* CSS

### Backend

* Node.js
* Express
* JWT Authentication
* bcrypt

### Banco de Dados

* MySQL (Aiven Cloud)

### Deploy

* Vercel (Frontend)
* Render (Backend)
* Aiven (Banco de Dados)

## Funcionalidades

* Cadastro de usuários
* Login com autenticação JWT
* Logout
* Rotas protegidas
* Criação de tarefas
* Edição de tarefas
* Exclusão de tarefas
* Alteração de status (Pendente/Concluída)

## Screenshots

### Login

![Login](./screenshots/login.png)

### Cadastro

![Cadastro](./screenshots/register.png)

### Lista de Tarefas

![Tasks](./screenshots/tasks.png)

## Arquitetura

Frontend (React) → Backend (Express) → MySQL (Aiven)

## Variáveis de Ambiente

### Backend

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=
JWT_EXPIRES_IN=
```

### Frontend

```env
VITE_API_URL=
```

## Como Executar Localmente

### Backend

```bash
npm install
npm start
```

### Frontend

```bash
npm install
npm run dev
```

## Autor

Kaue
