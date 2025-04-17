const pool = require("../connect");

const categorias = [
  { id: 1, categoria: "Perfumaria" },
  { id: 2, categoria: "Cuidados Pessoais" },
  { id: 3, categoria: "Kits" },
  { id: 4, categoria: "Corporal" },
  { id: 5, categoria: "Masculino" },
  { id: 6, categoria: "Feminino" },
];

const ocasioes = [
  { id: 1, ocasiao: "Presente" },
  { id: 2, ocasiao: "Uso diário" },
  { id: 3, ocasiao: "Datas comemorativas" },
  { id: 4, ocasiao: "Pós-treino" },
];

async function seedCategoriasEOcasioes() {
  try {
    for (const cat of categorias) {
      await pool.query(
        "INSERT INTO categorias (id_categoria, categoria) VALUES ($1, $2)",
        [cat.id, cat.categoria]
      );
    }

    for (const oc of ocasioes) {
      await pool.query(
        "INSERT INTO ocasioes (id_ocasiao, ocasiao) VALUES ($1, $2)",
        [oc.id, oc.ocasiao]
      );
    }

    console.log("✅ Categorias e ocasiões inseridas com sucesso!");
    process.exit();
  } catch (err) {
    console.error("❌ Erro ao inserir categorias ou ocasiões:", err);
    process.exit(1);
  }
}

seedCategoriasEOcasioes();
