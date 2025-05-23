const pool = require("../connect");

const categoriasProdutos = [
  // Homem Cor.agio
  { id_produto: 1, id_categoria: 1 },
  { id_produto: 1, id_categoria: 4 },

  // Biografia Feminino
  { id_produto: 2, id_categoria: 2 },
  { id_produto: 2, id_categoria: 4 },

  // Batom Multimix Cremoso Faces
  { id_produto: 3, id_categoria: 2 },
  { id_produto: 3, id_categoria: 5 },
  { id_produto: 3, id_categoria: 6 },

  // Kit Reparador Tododia Flor de Cereja e Abacate
  { id_produto: 4, id_categoria: 7 },
  { id_produto: 4, id_categoria: 9 },

  // Sabonete Mamãe e Bebê 5 unidades
  { id_produto: 5, id_categoria: 3 },
  { id_produto: 5, id_categoria: 8 },

  // Arbo Atlântica
  { id_produto: 6, id_categoria: 1 },
  { id_produto: 6, id_categoria: 4 },

  // Floratta Red Blossom
  { id_produto: 7, id_categoria: 2 },
  { id_produto: 7, id_categoria: 4 },

  // Paleta de Sombras Make B. Urban Ballet
  { id_produto: 8, id_categoria: 2 },
  { id_produto: 8, id_categoria: 5 },
  { id_produto: 8, id_categoria: 6 },

  // Combo Match Hidratação e Brilho: Condicionador 280ml + Refil 250ml
  { id_produto: 9, id_categoria: 7 },
  { id_produto: 9, id_categoria: 9 },

  // Frasqueira Com Trocador Boti Baby
  { id_produto: 10, id_categoria: 3 },
];

const ocasioesProdutos = [
  { id_produto: 1, id_ocasiao: 1 },
  { id_produto: 1, id_ocasiao: 6 },
  { id_produto: 1, id_ocasiao: 5 },

  { id_produto: 2, id_ocasiao: 1 },
  { id_produto: 2, id_ocasiao: 2 },
  { id_produto: 2, id_ocasiao: 3 },
  { id_produto: 2, id_ocasiao: 7 },

  { id_produto: 3, id_ocasiao: 2 },
  { id_produto: 3, id_ocasiao: 5 },

  { id_produto: 4, id_ocasiao: 2 },
  { id_produto: 4, id_ocasiao: 4 },
  { id_produto: 4, id_ocasiao: 7 },

  { id_produto: 5, id_ocasiao: 1 },
  { id_produto: 5, id_ocasiao: 2 },

  { id_produto: 6, id_ocasiao: 1 },
  { id_produto: 6, id_ocasiao: 2 },
  { id_produto: 6, id_ocasiao: 7 },

  { id_produto: 7, id_ocasiao: 1 },
  { id_produto: 7, id_ocasiao: 6 },
  { id_produto: 7, id_ocasiao: 5 },

  { id_produto: 8, id_ocasiao: 5 },
  { id_produto: 8, id_ocasiao: 6 },

  { id_produto: 9, id_ocasiao: 2 },

  { id_produto: 10, id_ocasiao: 1 },
  { id_produto: 10, id_ocasiao: 2 },
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
