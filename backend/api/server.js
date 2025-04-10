const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API rodando com PostgreSQL!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const usuariosAdmRoutes = require("./routes/usuariosAdm");
app.use("/administradores", usuariosAdmRoutes);

const validarUsuarios = require("./routes/validarUsuarios");
app.use("/login", validarUsuarios);

const rotasTeste = require("./routes/testes");
app.use("/testes", rotasTeste);

// app.get("/teste", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT NOW()");
//     res.send(`Conexão com o banco OK! Hora atual: ${result.rows[0].now}`);
//   } catch (err) {
//     console.error("Erro ao conectar no banco:", err);
//     res.status(500).send("Erro ao conectar no banco.");
//   }
// });
