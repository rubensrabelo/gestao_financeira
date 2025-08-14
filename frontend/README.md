# Financial Dashboard – Frontend

Este é o **frontend** do projeto **Financial Dashboard**, uma aplicação web para gerenciamento de transações financeiras (ganhos e gastos) com categorização, registro e visualização em formato de lista.  
O sistema foi desenvolvido em **React** e se comunica com uma **API backend** para autenticação e manipulação dos dados.

---

## Funcionalidades
- **Autenticação de Usuário** com JWT (login e logout).
- **Cadastro de Transações** (entrada e saída) com data, valor e categoria.
- **Cadastro de Categorias** personalizadas.
- **Listagem de Transações** com:
  - Data formatada em **pt-BR**.
  - Valor monetário formatado.
  - Tradução de tipos ("Entrada" / "Saída").
- **Dashboard** com botão rápido para adicionar transações.
- **Botão de Logout** no canto inferior direito da tela inicial.

---

## Tecnologias Utilizadas
- **React** (Vite ou Create React App)
- **React Router DOM** (navegação)
- **CSS Modules** (estilização)
- **Fetch API** (requisições HTTP)
- **LocalStorage** (armazenamento do token de autenticação)

---

## 📂 Estrutura de Pastas

```bash
src/
├── components/
│ ├── Transaction/
│ ├── Category/
│ └── Home/
│ └── Landing/
│ └── Login/
│ └── Register/
│ └── ...
├── router.jsx
├── main.jsx
```
---
