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

const usuariosAdmRoutes = require("../routes/usuariosAdm");
app.use("/administradores", usuariosAdmRoutes);

const validarUsuarios = require("../routes/validarUsuarios");
app.use("/login", validarUsuarios);

const produtosRoutes = require("../routes/produtos");
app.use("/produtos", produtosRoutes);
