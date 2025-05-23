require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API rodando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const deletarEndedrecoRoutes = require("../rotas/delete/deletarEndereco");
const desfavoritarProdutosRoutes = require("../rotas/delete/desfavoritarProdutos");

const carrinhosRoutes = require("../rotas/get/getCarrinhos");
const produtosRoutes = require("../rotas/get/getProdutos");
const enderecosRoutes = require("../rotas/get/getEnderecos");
const clientesRoutes = require("../rotas/get/getClientes");
const itensListaFavoritosRoutes = require("../rotas/get/getItensListaFavoritos");

const cadastradoUsuariosRoutes = require("../rotas/post/cadastrarUsuarios");
const cadastrarEnderecoRoutes = require("../rotas/post/cadastrarEnderecos");
const favoritarProdutosRoutes = require("../rotas/post/favoritarProduto");

const alterarDadosUsuarioRoutes = require("../rotas/put/atualizarDadosUsuario");
const atualizarDadosEnderecoRoutes = require("../rotas/put/atualizarDadosEndereco");
const alterarSenhaRoutes = require("../rotas/put/alterarSenha");

const validarUsuariosRoutes = require("../rotas/validarUsuarios");

// Rota deletar endereçoes de usuários
app.use("/deletar-endereco", deletarEndedrecoRoutes);

// Rota para desfavoritar produtos
app.use("/desfavoritar-produto", desfavoritarProdutosRoutes);

// Rota listar carrinhos
app.use("/carrinhos", carrinhosRoutes);

// Rota listar produtos
app.use("/produtos", produtosRoutes);

// Rota listar endereços
app.use("/enderecos", enderecosRoutes);

// Rota listar clientes
app.use("/clientes", clientesRoutes);

// Rota listar itens da lista de favoritos
app.use("/itens-lista-favoritos", itensListaFavoritosRoutes);

// Rota cadastrar usuários
app.use("/cadastro-usuarios", cadastradoUsuariosRoutes);

// Rota cadastrar novos endereços de usuários
app.use("/cadastrar-endereco", cadastrarEnderecoRoutes);

// Rota para favoritar produtos
app.use("/favoritar-produto", favoritarProdutosRoutes);

// Rota alterar dados de usuários
app.use("/atualizar-usuario", alterarDadosUsuarioRoutes);

// Rota alterar endereços de usuários
app.use("/atualizar-endereco", atualizarDadosEnderecoRoutes);

// Rota alterar senha de usuários
app.use("/alterar-senha", alterarSenhaRoutes);

// Rota validar usuários
app.use("/login", validarUsuariosRoutes);
