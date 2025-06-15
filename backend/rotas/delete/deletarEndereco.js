const express = require("express");
const router = express.Router();
const { deletarEndereco } = require("../../handlers/handlerDelete");

router.delete(
  "/:id", // idEndereco
  deletarEndereco
);

module.exports = router;
