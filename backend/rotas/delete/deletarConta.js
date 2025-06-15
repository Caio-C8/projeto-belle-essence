const express = require("express");
const router = express.Router();
const { deletarPorId } = require("../../handlers/handlerDelete");

router.delete(
  "/:id", // idCliente
  deletarPorId(
    "clientes",
    "id_cliente",
    "Conta excluída com sucesso.",
    "Conta de usuário não encontrada."
  )
);

module.exports = router;
