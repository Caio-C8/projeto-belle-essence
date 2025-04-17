const pool = require("../connect");

const categoriasProdutos = [
  { id_produto: 1, id_categoria: 2 },
  { id_produto: 1, id_categoria: 3 },
  { id_produto: 1, id_categoria: 5 },

  { id_produto: 2, id_categoria: 1 },
  { id_produto: 2, id_categoria: 5 },

  { id_produto: 3, id_categoria: 4 },
  { id_produto: 3, id_categoria: 6 },

  { id_produto: 4, id_categoria: 3 },
  { id_produto: 4, id_categoria: 2 },
  { id_produto: 4, id_categoria: 5 },

  { id_produto: 5, id_categoria: 1 },
  { id_produto: 5, id_categoria: 6 },
];

const ocasioesProdutos = [
  { id_produto: 1, id_ocasiao: 1 },
  { id_produto: 1, id_ocasiao: 2 },

  { id_produto: 2, id_ocasiao: 2 },
  { id_produto: 2, id_ocasiao: 3 },

  { id_produto: 3, id_ocasiao: 2 },

  { id_produto: 4, id_ocasiao: 4 },

  { id_produto: 5, id_ocasiao: 1 },
  { id_produto: 5, id_ocasiao: 3 },
];

async function seedRelacoes() {
  try {
    for (const rel of categoriasProdutos) {
      await pool.query(
        "INSERT INTO categorias_produto (id_produto, id_categoria) VALUES ($1, $2)",
        [rel.id_produto, rel.id_categoria]
      );
    }

    for (const rel of ocasioesProdutos) {
      await pool.query(
        "INSERT INTO ocasioes_produto (id_produto, id_ocasiao) VALUES ($1, $2)",
        [rel.id_produto, rel.id_ocasiao]
      );
    }

    console.log("✅ Relações de produtos inseridas com sucesso!");
    process.exit();
  } catch (err) {
    console.error("❌ Erro ao inserir relações de produtos:", err);
    process.exit(1);
  }
}

seedRelacoes();
