require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API rodando com PostgreSQL!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Rota cadastrar usuários
const cadastradoUsuariosRoutes = require("../routes/post/cadastroUsuarios");
app.use("/cadastro-usuarios", cadastradoUsuariosRoutes);

// Rota validar usuários
const validarUsuarios = require("../routes/validarUsuarios");
app.use("/login", validarUsuarios);

// Rota listar produtos
const produtosRoutes = require("../routes/get/getProdutos");
app.use("/produtos", produtosRoutes);

// Rota listar categorias de produtos
const categoriasProdutosRoutes = require("../routes/get/getCategoriasProdutos");
app.use("/categorias-produtos", categoriasProdutosRoutes);

// Rota listar ocasiões de produtos
const ocasioesProdutosRoutes = require("../routes/get/getOcasioesProdutos");
app.use("/ocasioes-produtos", ocasioesProdutosRoutes);

// Rota listar categorias
const categoriasRoutes = require("../routes/get/getCategorias");
app.use("/categorias", categoriasRoutes);

// Rota listar ocasiões
const ocasioesRoutes = require("../routes/get/getOcasioes");
app.use("/ocasioes", ocasioesRoutes);

// Rota listar carrinhos
const carrinhosRoutes = require("../routes/get/getCarrinhos");
app.use("/carrinhos", carrinhosRoutes);

// Rota listar clientes
const clientesRoutes = require("../routes/get/getClientes");
app.use("/clientes", clientesRoutes);

// Rota listar endereços
const enderecosRoutes = require("../routes/get/getEnderecos");
app.use("/enderecos", enderecosRoutes);

// Rota listar listas de favoritos
const listasFavoritosRoutes = require("../routes/get/getListasFavoritos");
app.use("/listas-favoritos", listasFavoritosRoutes);

// Rota listar pedidos
const pedidosRoutes = require("../routes/get/getPedidos");
app.use("/pedidos", pedidosRoutes);

// import React, { useState, useEffect } from "react";
// import { fetchApi } from "../api/api";

// const Componente = () => {
//   const [itensTabela, setItensTabela] = useState([]);

//   useEffect(() => {
//     const carregarDados = async () => {
//       const dadosRequisitados = await fetchApi("nome_da_tabela");
//
//       setItensTabela(dadosRequisitados);
//     };

//     carregarDados();
//   }, []);

//   return (
//     //código HTML
//   );
// };
