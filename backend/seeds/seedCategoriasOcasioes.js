const pool = require("../connect");

const categorias = [
  { id: 1, categoria: "Masculinos" },
  { id: 2, categoria: "Femininos" },
  { id: 3, categoria: "Infantis" },
  { id: 4, categoria: "Perfumes" },
  { id: 5, categoria: "Maquiagens" },
  { id: 6, categoria: "Skincare" },
  { id: 7, categoria: "Cabelos" },
  { id: 8, categoria: "Cuidados com o Corpo" },
  { id: 9, categoria: "Kits" },
];

const ocasioes = [
  { id: 1, ocasiao: "Presente" },
  { id: 2, ocasiao: "Dia a dia" },
  { id: 3, ocasiao: "Datas comemorativas" },
  { id: 4, ocasiao: "Pós-treino" },
  { id: 5, ocasiao: "Para sair" },
  { id: 6, ocasiao: "Ocasiões especiais" },
  { id: 7, ocasiao: "Trabalho" },
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
