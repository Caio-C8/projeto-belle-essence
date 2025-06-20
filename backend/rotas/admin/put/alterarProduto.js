const express = require("express");
const router = express.Router();
const pool = require("../../../connect");
const responder = require("../../../utilidades/responder");

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const campos = req.body;

  if (Object.keys(campos).length === 0) {
    return responder(res, {
      status: 400,
      sucesso: false,
      mensagem: "Nenhum campo enviado para atualização.",
    });
  }

  try {
    const camposPermitidos = [
      "nome",
      "codigo_produto",
      "marca",
      "preco",
      "qtde_estoque",
      "familia_olfativa",
      "concentracao",
      "banner",
      "imagem",
      "descricao",
      "data_vencimento",
    ];

    const updates = [];
    const values = [];
    let index = 1;

    // Atualizar campos básicos do produto
    for (const campo of camposPermitidos) {
      if (campos.hasOwnProperty(campo)) {
        updates.push(`${campo} = $${index}`);
        values.push(campos[campo]);
        index++;
      }
    }

    if (updates.length > 0) {
      const query = `
        UPDATE produtos
        SET ${updates.join(", ")}
        WHERE id_produto = $${index}
      `;
      values.push(id);
      await pool.query(query, values);
    }

    // Atualizar categorias (se vierem)
    if (campos.categorias !== undefined) {
      await pool.query("DELETE FROM categorias_produto WHERE id_produto = $1", [
        id,
      ]);

      const categoriasArray = campos.categorias
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c.length > 0);

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
          [id, idCategoria]
        );
      }
    }

    // Atualizar ocasiões (se vierem)
    if (campos.ocasioes !== undefined) {
      await pool.query("DELETE FROM ocasioes_produto WHERE id_produto = $1", [
        id,
      ]);

      const ocasioesArray = campos.ocasioes
        .split(",")
        .map((o) => o.trim())
        .filter((o) => o.length > 0);

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
          [id, idOcasiao]
        );
      }
    }

    responder(res, {
      mensagem: "Produto atualizado com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    responder(res, {
      status: 500,
      sucesso: false,
      mensagem: "Erro ao atualizar produto.",
    });
  }
});

module.exports = router;
