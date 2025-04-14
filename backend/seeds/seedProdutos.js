const pool = require("../connect"); // ajuste o caminho se estiver em outra pasta

const produtos = [
  {
    id_produto: 1,
    codigo_produto: "B2025030504",
    imagem:
      "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:eco,w_80/v1/imagens/product/B2025030512/bca2f0b6-0a73-48dd-b1f9-8b37755c0e1b-bot-2025030512.jpg",
    banner:
      "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:low,w_1220/v1/banner/2025_03_20_12_23_42_4/f811eec8-c6c4-4e28-8328-447e36bf9fc3-menenba-25c05-billboard-desk-2440x750.jpg",
    nome: "Combo Men NBA: Sabonete em barra 90g + Shower Gel 200g + Desodorante Antitranspirante 150ml",
    marca: "O Boticário",
    descricao: null,
    volume: null,
    familia_olfativa: null,
    concentracao: null,
    preco: 112.7,
    qtde_estoque: 5,
    lancamento: true,
    promocao: true,
    tempo_promocao: "45 days",
    banner_promocao:
      "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:low,w_1220/v1/banner/2025_03_20_12_23_42_4/f811eec8-c6c4-4e28-8328-447e36bf9fc3-menenba-25c05-billboard-desk-2440x750.jpg",
    descricao_promocao: "O Boticário Men & NBA se uniram... [texto resumido]",
    preco_promocao: 89.7,
  },
  {
    id_produto: 2,
    codigo_produto: "B2025011001",
    imagem:
      "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,q_auto/v1/imagens/product/01.jpg",
    banner:
      "https://res.cloudinary.com/beleza-na-web/image/upload/v1/banner/banner2.jpg",
    nome: "Malbec Eau de Toilette 100ml",
    marca: "O Boticário",
    descricao:
      "A fragrância masculina amadeirada com notas de uva e madeira envelhecida em barris de carvalho.",
    volume: "100ml",
    familia_olfativa: "Amadeirado",
    concentracao: "Eau de Toilette",
    preco: 179.9,
    qtde_estoque: 12,
    lancamento: false,
    promocao: false,
    tempo_promocao: null,
    banner_promocao: null,
    descricao_promocao: null,
    preco_promocao: null,
  },
  {
    id_produto: 3,
    codigo_produto: "B2025020202",
    imagem:
      "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,q_auto/v1/imagens/product/02.jpg",
    banner:
      "https://res.cloudinary.com/beleza-na-web/image/upload/v1/banner/banner3.jpg",
    nome: "Lily Creme Acetinado Corporal 250g",
    marca: "O Boticário",
    descricao: "Creme acetinado com textura envolvente e perfume intenso.",
    volume: "250g",
    familia_olfativa: "Floral",
    concentracao: null,
    preco: 104.9,
    qtde_estoque: 8,
    lancamento: true,
    promocao: false,
    tempo_promocao: null,
    banner_promocao: null,
    descricao_promocao: null,
    preco_promocao: null,
  },
  {
    id_produto: 4,
    codigo_produto: "B2025030603",
    imagem:
      "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,q_auto/v1/imagens/product/03.jpg",
    banner:
      "https://res.cloudinary.com/beleza-na-web/image/upload/v1/banner/banner4.jpg",
    nome: "Combo Malbec Club: Desodorante + Sabonete Líquido + Balm Pós Barba",
    marca: "O Boticário",
    descricao: null,
    volume: null,
    familia_olfativa: null,
    concentracao: null,
    preco: 134.5,
    qtde_estoque: 4,
    lancamento: false,
    promocao: true,
    tempo_promocao: "10 days",
    banner_promocao:
      "https://res.cloudinary.com/beleza-na-web/image/upload/v1/banner/banner-promo-malbec.jpg",
    descricao_promocao:
      "Kit completo da linha Malbec Club com aroma marcante e cuidado diário para o homem moderno.",
    preco_promocao: 99.9,
  },
  {
    id_produto: 5,
    codigo_produto: "B2025040404",
    imagem:
      "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,q_auto/v1/imagens/product/04.jpg",
    banner:
      "https://res.cloudinary.com/beleza-na-web/image/upload/v1/banner/banner5.jpg",
    nome: "Floratta Red Desodorante Colônia 75ml",
    marca: "O Boticário",
    descricao:
      "Fragrância feminina inspirada na flor da maçã de Vermont, romântica e vibrante.",
    volume: "75ml",
    familia_olfativa: "Floral Frutado",
    concentracao: "Desodorante Colônia",
    preco: 104.9,
    qtde_estoque: 15,
    lancamento: false,
    promocao: true,
    tempo_promocao: "20 days",
    banner_promocao:
      "https://res.cloudinary.com/beleza-na-web/image/upload/v1/banner/banner-promo-floratta.jpg",
    descricao_promocao:
      "Floratta Red em promoção por tempo limitado, celebre sua essência com mais economia!",
    preco_promocao: 79.9,
  },
];

async function inserirProdutos() {
  for (const p of produtos) {
    try {
      await pool.query(
        `INSERT INTO produtos (
          id_produto,
          codigo_produto,
          imagem,
          banner,
          nome,
          marca,
          descricao,
          volume,
          familia_olfativa,
          concentracao,
          preco,
          qtde_estoque,
          lancamento,
          promocao,
          tempo_promocao,
          banner_promocao,
          descricao_promocao,
          preco_promocao
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16, $17, $18
        )`,
        [
          p.id_produto,
          p.codigo_produto,
          p.imagem,
          p.banner,
          p.nome,
          p.marca,
          p.descricao,
          p.volume || "",
          p.familia_olfativa,
          p.concentracao,
          p.preco,
          p.qtde_estoque,
          p.lancamento,
          p.promocao,
          p.tempo_promocao ? `${p.tempo_promocao}` : null,
          p.banner_promocao,
          p.descricao_promocao,
          p.preco_promocao,
        ]
      );
      console.log(`✅ Produto "${p.nome}" inserido com sucesso.`);
    } catch (err) {
      console.error(`❌ Erro ao inserir "${p.nome}":`, err.message);
    }
  }

  console.log("🌱 Inserção concluída.");
  process.exit();
}

inserirProdutos();
