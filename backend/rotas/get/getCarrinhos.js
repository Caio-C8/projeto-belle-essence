const express = require("express");
const router = express.Router();
const verificarToken = require("../../middlewares/verificarToken");
const { listarUnicoPorUsuario } = require("../../db/controladores");

router.get(
  "/",
  verificarToken,
  listarUnicoPorUsuario("carrinhos", "id_cliente")
);

module.exports = router;
