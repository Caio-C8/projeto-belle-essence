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

const cadastradoUsuariosRoutes = require("../rotas/post/cadastroUsuarios");
const listasFavoritosRoutes = require("../rotas/get/getListasFavoritos");
const carrinhosRoutes = require("../rotas/get/getCarrinhos");
const validarUsuariosRoutes = require("../rotas/validarUsuarios");
const produtosRoutes = require("../rotas/get/getProdutos");
const enderecosRoutes = require("../rotas/get/getEnderecos");
const clientesRoutes = require("../rotas/get/getClientes");
const alterarDadosUsuarioRoutes = require("../rotas/put/atualizarDadosUsuario");
// const ocasioesRoutes = require("../rotas/get/getOcasioes");
// const categoriasRoutes = require("../rotas/get/getCategorias");
// const ocasioesProdutosRoutes = require("../rotas/get/getOcasioesProdutos");
// const categoriasProdutosRoutes = require("../rotas/get/getCategoriasProdutos");
// const pedidosRoutes = require("../rotas/get/getPedidos");

// Rota cadastrar usuários
app.use("/cadastro-usuarios", cadastradoUsuariosRoutes);

// Rota alterar dados de usuários
app.use("/atualizar-usuario", alterarDadosUsuarioRoutes);

// Rota validar usuários
app.use("/login", validarUsuariosRoutes);

// Rota listar carrinhos
app.use("/carrinhos", carrinhosRoutes);

// Rota listar listas de favoritos
app.use("/listas-favoritos", listasFavoritosRoutes);

// Rota listar produtos
app.use("/produtos", produtosRoutes);

// // Rota listar categorias de produtos
// app.use("/categorias-produtos", categoriasProdutosRoutes);

// // Rota listar ocasiões de produtos
// app.use("/ocasioes-produtos", ocasioesProdutosRoutes);

// // Rota listar categorias
// app.use("/categorias", categoriasRoutes);

// // Rota listar ocasiões
// app.use("/ocasioes", ocasioesRoutes);

// Rota listar clientes
app.use("/clientes", clientesRoutes);

// Rota listar endereços
app.use("/enderecos", enderecosRoutes);

// // Rota listar pedidos
// app.use("/pedidos", pedidosRoutes);
