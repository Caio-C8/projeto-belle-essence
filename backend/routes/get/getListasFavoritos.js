const express = require("express");
const router = express.Router();
const verificarToken = require("../../middlewares/verificarToken");
const { listarUnicoPorUsuario } = require("../../db/controladores");

router.get(
  "/",
  verificarToken,
  listarUnicoPorUsuario("listas_favoritos", "id_lista_favoritos")
);

module.exports = router;
