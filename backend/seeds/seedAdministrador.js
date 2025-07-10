const pool = require("../connect");
const bcrypt = require("bcrypt");

// e-mail: adm@email.com
// senha: 123

const senha = "123";
const senhaCriptografada = await bcrypt.hash(senha, 10);

const admnistradores = [
  {
    email: "adm@email.com",
    senha: senhaCriptografada,
  },
];

async function seedAdministrador() {
  for (const adm of admnistradores) {
    try {
      await pool.query(
        "INSERT INTO administradores (email_adm, senha_adm) VALUES ($1, $2)",
        [adm.email, adm.senha]
      );
      console.log(`✅ Administrador ${adm.email} inserido com sucesso!`);
    } catch (err) {
      console.error(`❌ Erro ao inserir administrador ${adm.email}:`, err);
    }
  }

  console.log("🌱 Inserção concluída.");
  process.exit();
}

seedAdministrador();
