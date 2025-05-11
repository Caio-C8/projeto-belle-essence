const express = require("express");
const router = express.Router();
const { buscarPorId, deletarItemPorId } = require("../../db/queries");

router.delete("/:id", async (req, res) => {
  const idEndereco = req.params.id;

  try {
    const endereco = await buscarPorId("enderecos", "id_endereco", idEndereco);

    if (!endereco) {
      return res.status(404).json({ mensagem: "Endereço não encontrado." });
    }

    await deletarItemPorId("enderecos", "id_endereco", idEndereco);

    res.status(200).json({ mensagem: "Endereço excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir endereço:", error);
    res.status(500).send("Erro no servidor");
  }
});

module.exports = router;
