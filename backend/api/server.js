require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("API rodando!");
});

const deletarEndedrecoRoutes = require("../rotas/delete/deletarEndereco");
const desfavoritarProdutosRoutes = require("../rotas/delete/desfavoritarProdutos");
const retirarProdutosCarrinhoRoutes = require("../rotas/delete/retirarProdutosCarrinho");
const deletarContasRoutes = require("../rotas/delete/deletarConta");
const esvaziarCarrinhoRoutes = require("../rotas/delete/esvaziarCarrinho");

const carrinhosRoutes = require("../rotas/get/getItensCarrinho");
const produtosRoutes = require("../rotas/get/getProdutos");
const enderecosRoutes = require("../rotas/get/getEnderecos");
const clientesRoutes = require("../rotas/get/getClientes");
const itensListaFavoritosRoutes = require("../rotas/get/getItensListaFavoritos");
const itensCarrinhosRoutes = require("../rotas/get/getItensCarrinho");
const informacoesPedidosRoutes = require("../rotas/get/getInformacoesPedido");
const pesquisaProdutosRoutes = require("../rotas/get/pesquisaProdutos");
const categoriasRoutes = require("../rotas/get/getCategorias");
const filtrosRoutes = require("../rotas/get/filtros"); // Nova rota para filtros

const cadastradoUsuariosRoutes = require("../rotas/post/cadastrarUsuarios");
const cadastrarEnderecoRoutes = require("../rotas/post/cadastrarEnderecos");
const favoritarProdutosRoutes = require("../rotas/post/favoritarProduto");
const colocarProdutoCarrinhoRoutes = require("../rotas/post/colocarProdutoCarrinho");
const realizarPedidoRoutes = require("../rotas/post/realizarPedido");

const alterarDadosUsuarioRoutes = require("../rotas/put/atualizarDadosCliente");
const atualizarDadosEnderecoRoutes = require("../rotas/put/atualizarDadosEndereco");
const alterarSenhaRoutes = require("../rotas/put/alterarSenha");
const atualizarQuantidadeCarrinhoRoutes = require("../rotas/put/atualizarQuantidadeCarrinho");
const cancelarPedidoRoutes = require("../rotas/put/cancelarPedido");

const validarUsuariosRoutes = require("../rotas/validarUsuarios");

// --- DELETE --- //

// Rota deletar endereçoes de usuários
app.use("/deletar-endereco", deletarEndedrecoRoutes);

// Rota para desfavoritar produtos
app.use("/desfavoritar-produto", desfavoritarProdutosRoutes);

// Rota para retirar produtos do carrinho
app.use("/retirar-produtos-carrinho", retirarProdutosCarrinhoRoutes);

// Rota para deletar contas
app.use("/deletar-conta", deletarContasRoutes);

// Rota para esvaziar carrinho
app.use("/esvaziar-carrinho", esvaziarCarrinhoRoutes);

// --- DELETE --- //

// --- GET --- //

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

// Rota listar itens do carrinho
app.use("/itens-carrinho", itensCarrinhosRoutes);

// Rota listar informações dos pedidos
app.use("/informacoes-pedidos", informacoesPedidosRoutes);

// Rota para pesquisar por produtos
app.use("/pesquisa", pesquisaProdutosRoutes);

// Rota para listar todas as categorias
app.use("/categorias", categoriasRoutes);

// Rota para obter filtros dinâmicos
app.use("/filtros", filtrosRoutes);

// --- GET --- //

// --- POST --- //

// Rota cadastrar usuários
app.use("/cadastro-usuarios", cadastradoUsuariosRoutes);

// Rota cadastrar novos endereços de usuários
app.use("/cadastrar-endereco", cadastrarEnderecoRoutes);

// Rota para favoritar produtos
app.use("/favoritar-produto", favoritarProdutosRoutes);

// Rota para colocar produtos no carrinho
app.use("/colocar-produtos-carrinho", colocarProdutoCarrinhoRoutes);

// Rota para registrar pedidos
app.use("/realizar-pedido", realizarPedidoRoutes);

// --- POST --- //

// --- PUT --- //

// Rota alterar dados de usuários
app.use("/atualizar-usuario", alterarDadosUsuarioRoutes);

// Rota alterar endereços de usuários
app.use("/atualizar-endereco", atualizarDadosEnderecoRoutes);

// Rota alterar senha de usuários
app.use("/alterar-senha", alterarSenhaRoutes);

// Rota para alterar quantidade de produtos no carrinho
app.use("/atualizar-quantidade", atualizarQuantidadeCarrinhoRoutes);

// Rota para cancelar pedidos
app.use("/cancelar-pedido", cancelarPedidoRoutes);

// --- PUT --- //

// Rota validar usuários
app.use("/login", validarUsuariosRoutes);

const adminCadastrarProdutosRoutes = require("../rotas/admin/post/cadastrarProdutos");

const adminAlterarProdutosRoutes = require("../rotas/admin/put/alterarProduto");
const adminDesativarProdutosRoutes = require("../rotas/admin/put/desativarProduto");
const adminAtivarProdutosRoutes = require("../rotas/admin/put/ativarProduto");

// --- DELETE --- //

// --- DELETE --- //

// --- GET --- //

// --- GET --- //

// --- POST --- //

// Rota para cadastrar produtos
app.use("/adm/cadastrar-produtos", adminCadastrarProdutosRoutes);

// --- POST --- //

// --- PUT --- //

// Rota pra alterar produtos cadastrados
app.use("/adm/alterar-produto", adminAlterarProdutosRoutes);

// Rora para desativar produtos
app.use("/adm/desativar-produto", adminDesativarProdutosRoutes);

// Rora para ativar produtos
app.use("/adm/ativar-produto", adminAtivarProdutosRoutes);

// --- PUT --- //
