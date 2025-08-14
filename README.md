# Projeto Financeiro - Fullstack

## Descrição
Este projeto é uma aplicação **fullstack** para gerenciamento financeiro pessoal, permitindo que o usuário controle **entradas, saídas, categorias e transferências**.  
Ele é dividido em **duas partes principais**: o **backend**, responsável pela lógica de negócios e persistência de dados, e o **frontend**, responsável pela interface do usuário.

---

## Estrutura do Projeto

### Backend
A pasta `backend` contém a API construída com **Node.js** e **Express**, incluindo:
- Rotas para **usuários**, **transações** e **categorias**.
- Autenticação via **JWT**.
- Docker para facilitar o ambiente.
- Conexão com banco de dados.
- Estrutura organizada em **controllers**, **models**, **routes** e **middlewares**.

### Frontend
A pasta `frontend` contém a aplicação construída com **React**, incluindo:
- Telas para **login**, **cadastro**, **home** e gerenciamento de **transações** e **categorias**.
- Componentes reutilizáveis e estilização com **CSS modular**.
- Consumo da API do backend via **fetch**.
- Controle de estado simples para gerenciar dados do usuário.

---

## Funcionalidades Principais
- Cadastro e login de usuários.
- Registro de **entradas e saídas**.
- Gerenciamento de categorias.

---