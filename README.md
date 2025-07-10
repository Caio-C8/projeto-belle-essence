# Projeto Belle Essence

## Visão geral

Este é um site feito para uma micro empresa, chamada Eliane Multimarcas, que revende produtos cosméticos de outras empresas, como O Boticário, Natura, etc. O foco do desenvolvimento foi fazer com que os processos realizados na empresa fossem centralizados em uma única aplicação, com o administrador podendo controlar estoque, pedidos e promoções, além de possibilitar clientes a realizarem pedidos através do site.

## Tecnologias Utilizadas

### Front-end

- **CSS3**
- **React**
- **Bootstrap 4/5**

### Back-end

- **Node.js**
- **Express.js**

### Banco de dados

- **PostgreSQL**

## Observações

- Este projeto foi desenvolvido para fins acadêmicos em aproximadamente 6 meses, durante o 3º período do curso de Sistemas de Informação

## Instruções de execução

1. **Crie um novo banco de dados**
2. **Crie as tabelas no banco com o arquivo "criarTabelas.sql" (crie do jeito que achar melhor)**
3. **Troque as informações do arquivo ".env.example" que está em "backend/.env.example", colocando o nome do banco, seu host, sua senha, etc**
4. **Renomeie o arquivo para ".env"**
5. **Abra o terminal na raiz do projeto**
6. **Execute no terminal:**

```bash
npm run seed
```

7. **Execute no terminal:**

```bash
npm run start:servers
```

### Pré-requsitos

- [PostgreSQL](https://www.postgresql.org/download/) instalado.
