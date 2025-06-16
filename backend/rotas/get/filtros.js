const express = require("express");
const router = express.Router();
const pool = require("../../connect");
const responder = require("../../utilidades/responder");

router.get("/", async (req, res) => {
  try {
    const marcasResult = await pool.query(
      "SELECT DISTINCT marca FROM produtos WHERE marca IS NOT NULL"
    );
    const familiasResult = await pool.query(
      "SELECT DISTINCT familia_olfativa FROM produtos WHERE familia_olfativa IS NOT NULL"
    );
    const concentracoesResult = await pool.query(
      "SELECT DISTINCT concentracao FROM produtos WHERE concentracao IS NOT NULL"
    );

    const faixasPreco = [
      { slug: "ate-50", label: "Até R$50" },
      { slug: "50-100", label: "R$50 a R$100" },
      { slug: "100-150", label: "R$100 a R$150" },
      { slug: "150-200", label: "R$150 a R$200" },
      { slug: "200-250", label: "R$200 a R$250" },
      { slug: "acima-250", label: "Acima de R$250" },
    ];

    responder(res, {
      dados: {
        marcas: marcasResult.rows.map((r) => r.marca),
        familias_olfativas: familiasResult.rows.map((r) => r.familia_olfativa),
        concentracoes: concentracoesResult.rows.map((r) => r.concentracao),
        faixas_preco: faixasPreco,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar filtros:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

module.exports = router;
