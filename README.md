# Projeto Financeiro – Fullstack

## Descrição

Este projeto é uma aplicação **fullstack** para gerenciamento financeiro pessoal.
O objetivo é permitir que o usuário controle de forma prática suas **entradas, saídas, categorias e transferências**.

A solução está dividida em **duas camadas principais**:

* **Backend**: responsável pela lógica de negócios, autenticação e persistência de dados.
* **Frontend**: responsável pela interface do usuário e interação com a API.

---

## Estrutura do Projeto

### Backend

A pasta `backend` contém a API construída com **Node.js** e **Express**, com:

* Rotas para **usuários**, **transações** e **categorias**.
* Autenticação com **JWT**.
* Ambiente configurado com **Docker**.
* Integração com banco de dados.
* Estrutura organizada em **controllers**, **models**, **routes** e **middlewares**.

### Frontend

A pasta `frontend` contém a aplicação desenvolvida em **React**, com:

* Telas de **login**, **cadastro**, **home** e gerenciamento de **transações** e **categorias**.
* Componentes reutilizáveis e estilização com **CSS modular**.
* Consumo da API via **fetch**.
* Controle de estado simples para dados do usuário.

---

## Funcionalidades Principais

* Cadastro e login de usuários.
* Registro e listagem de **entradas e saídas**.
* Gerenciamento de categorias personalizadas.
* (Em breve) **Transferências entre categorias**.

---