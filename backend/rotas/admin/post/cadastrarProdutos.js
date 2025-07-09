const express = require("express");
const router = express.Router();
const pool = require("../../../connect");
const responder = require("../../../utilidades/responder");

router.post("/", async (req, res) => {
  try {
    const {
      nome,
      codigo,
      marca,
      preco,
      estoque,
      familiaOlfativa,
      concentracao,
      categorias,
      ocasioes,
      banner,
      imagem,
      descricao,
      dataVencimento,
    } = req.body;

    const insertProdutoText = `
      INSERT INTO produtos 
      (codigo_produto, nome, marca, preco, qtde_estoque, familia_olfativa, concentracao, banner, imagem, descricao, data_lancamento, data_vencimento)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), $11)
      RETURNING id_produto
    `;
    const insertProdutoValues = [
      codigo,
      nome,
      marca,
      preco,
      estoque,
      familiaOlfativa || null,
      concentracao || null,
      banner || null,
      imagem || null,
      descricao || null,
      dataVencimento || null,
    ];

    const resultProduto = await pool.query(
      insertProdutoText,
      insertProdutoValues
    );

    const idProduto = resultProduto.rows[0].id_produto;

    const categoriasArray = categorias
      ? categorias
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c.length > 0)
      : [];

    for (const categoria of categoriasArray) {
      let resultCategoria = await pool.query(
        "SELECT id_categoria FROM categorias WHERE categoria = $1",
        [categoria]
      );

      let idCategoria;
      if (resultCategoria.rowCount === 0) {
        const insertCategoria = await pool.query(
          "INSERT INTO categorias (categoria) VALUES ($1) RETURNING id_categoria",
          [categoria]
        );
        idCategoria = insertCategoria.rows[0].id_categoria;
      } else {
        idCategoria = resultCategoria.rows[0].id_categoria;
      }

      await pool.query(
        "INSERT INTO categorias_produto (id_produto, id_categoria) VALUES ($1, $2)",
        [idProduto, idCategoria]
      );
    }

    const ocasioesArray = ocasioes
      ? ocasioes
          .split(",")
          .map((o) => o.trim())
          .filter((o) => o.length > 0)
      : [];

    for (const ocasiao of ocasioesArray) {
      let resultOcasiao = await pool.query(
        "SELECT id_ocasiao FROM ocasioes WHERE ocasiao = $1",
        [ocasiao]
      );

      let idOcasiao;
      if (resultOcasiao.rowCount === 0) {
        const insertOcasiao = await pool.query(
          "INSERT INTO ocasioes (ocasiao) VALUES ($1) RETURNING id_ocasiao",
          [ocasiao]
        );
        idOcasiao = insertOcasiao.rows[0].id_ocasiao;
      } else {
        idOcasiao = resultOcasiao.rows[0].id_ocasiao;
      }

      await pool.query(
        "INSERT INTO ocasioes_produto (id_produto, id_ocasiao) VALUES ($1, $2)",
        [idProduto, idOcasiao]
      );
    }

    responder(res, {
      mensagem: "Produto cadastrado com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    return responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro no servidor",
    });
  }
});

module.exports = router;
