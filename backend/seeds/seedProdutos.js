const pool = require("../connect"); // ajuste o caminho se estiver em outra pasta

const produtos = [
  {
    id_produto: 1,
    codigo_produto: "NATBRA-89834",
    imagem:
      "https://production.na01.natura.com/on/demandware.static/-/Sites-natura-br-storefront-catalog/default/dwd373ef96/produto-joia/background/mobile/89834.jpg",
    banner:
      "https://production.na01.natura.com/on/demandware.static/-/Sites-NatBrazil-Library/default/dwf8c2f2b6/Produtos%20Joia/Nova%20experiência/NATBRA-89834/NATBRA-89834_WidePic_1.jpg",
    nome: "Homem Cor.agio",
    marca: "Natura",
    descricao: `Uma fragrância que celebra a coragem e a autenticidade. É o arrepio na pele das notas metálicas de especiarias frias e o calor da madeira copaíba e do cumaru, ingredientes naturais da biodiversidade brasileira. • fragrância que exala coragem e autenticidade • perfumação intensa e duradoura • ideal para ocasiões especiais.`,
    volume: "100 ml",
    familia_olfativa: "deo parfum",
    concentracao: "amadeirado",
    preco: 289.9,
    qtde_estoque: 5,
    lancamento: true,
    promocao: true,
    tempo_promocao: "45 days",
    banner_promocao: null,
    descricao_promocao: null,
    preco_promocao: 199.9,
  },
  {
    id_produto: 2,
    codigo_produto: "NATBRA-71600",
    imagem:
      "https://production.na01.natura.com/on/demandware.static/-/Sites-natura-br-storefront-catalog/default/dwb7151aaf/produto-joia/background/mobile/71600.jpg",
    banner:
      "https://production.na01.natura.com/on/demandware.static/-/Sites-NatBrazil-Library/default/dwb9a22624/Produtos%20Joia/Nova%20experiência/NATBRA-71600/NATBRA-71600_widepic_1.jpg",
    nome: "Biografia Feminino",
    marca: "Natura",
    descricao: `Biografia Feminino: celebre sua história com fragrâncias atemporais. Biografia desodorante colônia feminino nasceu para celebrar a história mais importante que existe: a sua. Com mil histórias entrelaçadas, ela combina passado, presente e futuro em uma narrativa única. Porque toda biografia é fascinante, especialmente quando se trata do desodorante biografia feminino.`,
    volume: "100ml",
    familia_olfativa: "Floral",
    concentracao: "deo colônia",
    preco: 199.9,
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
    codigo_produto: "NATBRA-116201",
    imagem:
      "https://production.na01.natura.com/on/demandware.static/-/Sites-natura-br-storefront-catalog/default/dwa1aa5300/Produtos/NATBRA-116201_1.jpg",
    banner:
      "https://production.na01.natura.com/on/demandware.static/-/Sites-NatBrazil-Library/default/dw2870a29a/Produtos%20Joia/Nova%20experiência/NATBRA-116201/NATBRA-116201_widePic_1_desktop.png",
    nome: "Batom Multimix Cremoso Faces",
    marca: "Natura",
    descricao:
      "O Batom Multimix Cremoso Faces traz uma nova fórmula vegana, sensação creamy nos lábios e 9 cores para criar makes incríveis. bye bye lábios ressecados!",
    volume: "3,5 g",
    familia_olfativa: null,
    concentracao: null,
    preco: 21.9,
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
    codigo_produto: "NATBRA-194392",
    imagem:
      "https://production.na01.natura.com/on/demandware.static/-/Sites-natura-br-storefront-catalog/default/dw7710c1c8/NATBRA-194392_1.jpg",
    banner:
      "https://production.na01.natura.com/on/demandware.static/-/Sites-natura-br-storefront-catalog/default/dw7710c1c8/NATBRA-194392_1.jpg",
    nome: "Kit Reparador Tododia Flor de Cereja e Abacate",
    marca: "Natura",
    descricao: `Tododia é dia de cuidar dos seus cabelos com produtos gostosos e fragrâncias deliciosas que trazem bem-estar para sua rotina de um jeito simples e descomplicado. Este kit traz o Shampoo Reparador Flor de Cereja e Abacate, que limpa e recupera os cabelos danificados, e o Condicionador Reparador Flor de Cereja e Abacate, que sela os fios, reduz pontas duplas e promove reparação da fibra capilar.   Benefícios: Shampoo: limpeza suave, reparação dos fios e prevenção do ressecamento. Condicionador: reparação profunda, selagem das pontas e redução de pontas duplas.   Conteúdo: 1 Shampoo Reparador Flor de Cereja e Abacate 300 ml 1 Condicionador Reparador Flor de Cereja e Abacate 300 ml`,
    volume: null,
    familia_olfativa: null,
    concentracao: null,
    preco: 69.8,
    qtde_estoque: 4,
    lancamento: false,
    promocao: true,
    tempo_promocao: "10 days",
    banner_promocao: null,
    descricao_promocao: null,
    preco_promocao: 62.82,
  },
  {
    id_produto: 5,
    codigo_produto: "NATBRA-92795",
    imagem:
      "https://production.na01.natura.com/on/demandware.static/-/Sites-natura-br-storefront-catalog/default/dw4341ba29/NATBRA-92795_1.jpg",
    banner:
      "https://production.na01.natura.com/on/demandware.static/-/Sites-NatBrazil-Library/default/dwac8f7b30/Produtos%20Joia/Nova%20experiência/NATBRA-92795/NATBRA-92795_widePic_1_desktop.jpg",
    nome: "Sabonete Mamãe e Bebê 5 unidades",
    marca: "Natura",
    descricao: `Sabonete Natura Mamãe e Bebê: Limpeza delicada desde o primeiro banho. O Sabonete Mamãe e Bebê oferece uma limpeza suave e eficaz, respeitando a delicadeza da pele do bebê. com sua fórmula 100% vegetal e ingredientes de origem natural, este sabonete limpa sem ressecar, deixando a pele macia, protegida e delicadamente perfumada. Ideal para um cuidado diário cheio de carinho desde o primeiro banho.`,
    volume: "100 g 1 un",
    familia_olfativa: "Floral Frutado",
    concentracao: "Desodorante Colônia",
    preco: 47.9,
    qtde_estoque: 15,
    lancamento: false,
    promocao: true,
    tempo_promocao: "20 days",
    banner_promocao: null,
    descricao_promocao: null,
    preco_promocao: 38.3,
  },
  {
    id_produto: 6,
    codigo_produto: "B55366",
    imagem:
      "https://res.cloudinary.com/beleza-na-web/image/upload/w_1500,f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/product/B55366/a916ff40-95ba-46ed-8ac4-5a22603fa11b-bot-55366-arbo-atlantica-desodorante-colonia-01.jpg",
    banner:
      "https://res.cloudinary.com/beleza-na-web/image/upload/w_1500,f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/product/B55366/784b9b3c-8f4d-4206-848c-7d1283d5c1a1-bot-55366-arbo-atlantica-desodorante-colonia-03.jpg",
    nome: "Arbo Atlântica",
    marca: "Arbo",
    descricao: `Arbo, a marca mais sustentável da Perfumaria O Boticário, acredita no poder transformador da natureza. Arbo Atlântica Desodorante Colônia traz o DNA de Arbo com a exuberância da mata atlântica na Reserva Natural Salto Morato. Para a construção da fragrância, utilizamos o Acorde Cachoeira Salto Morato, captado através de uma tecnologia ecológica que extrai moléculas aromáticas do ambiente. Fomos até a cachoeira que fica dentro da Reserva Natural para captar o “cheiro da reserva”, sem degradar a vegetação. O acorde emana a energia revigorante de uma cachoeira em harmonia com a natureza preservada: Sinta a explosão fresca e aromática da Hortelã e da Sálvia, combinada à potência amadeirada do Vetiver, que evoca a exuberância da floresta. Formulado com 94,11% de ingredientes de origem natural*, é a primeira fragrância brasileira a utilizar álcool proveniente da captura de dióxido de carbono.**. Este produto contém matéria-prima produzida a partir de emissões de carbono recicladas, utilizando tecnologia que captura, purifica e converte gases de efeito estufa em álcool. Uma fragrância que vibra com a essência da Mata Atlântica, um dos biomas mais diversos do planeta.`,
    volume: "100 ml",
    familia_olfativa: "Aromático",
    concentracao: "Desodorante Colônia",
    preco: 169.9,
    qtde_estoque: 20,
    lancamento: true,
    promocao: false,
    tempo_promocao: null,
    banner_promocao: null,
    descricao_promocao: null,
    preco_promocao: null,
  },
  {
    id_produto: 7,
    codigo_produto: "B49973",
    imagem:
      "https://res.cloudinary.com/beleza-na-web/image/upload/w_1500,f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/product/B49973/819b0d95-0c96-404c-b31c-6f7bac84f4f5-bot-49973-floratta-red-blossom-frontal-01.jpg",
    banner:
      "https://res.cloudinary.com/beleza-na-web/image/upload/w_1500,f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/product/B49973/4568be72-00e7-4942-bb63-c17340fc03f4-bot-49973-floratta-red-blossom-segredinho.jpg",
    nome: "Floratta Red Blossom",
    marca: "O Boticário",
    descricao: `Floratta acredita que quando você vive um romance sem compromisso você se surpreende. Por isso, criou Floratta Red Blossom, fragrância inspirada em Floratta Red, para dar um toque de sensualidade, frescor e leveza no seu dia a dia. Uma releitura mais vibrante, floral e suculenta da Maçã de Vermont que, envelopada pela feminilidade da gardênia e sofisticação de notas amadeiradas cremosas, entrega uma perfumação com alta fixação e irresistível. A sensação floral fresca que essa fragrância moderna e ultra feminina entrega, inspira quem deseja um romance leve, mas com muito desejo. Surpreenda-se em um romance sem compromisso com Floratta Red Blossom.`,
    volume: "75 ml",
    familia_olfativa: "Floral",
    concentracao: "Desodorante Colônia",
    preco: 149.9,
    qtde_estoque: 13,
    lancamento: true,
    promocao: true,
    tempo_promocao: "30 days",
    banner_promocao: null,
    descricao_promocao: null,
    preco_promocao: 119.9,
  },
  {
    id_produto: 8,
    codigo_produto: "B87252",
    imagem:
      "https://res.cloudinary.com/beleza-na-web/image/upload/w_1500,f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/product/B87252/57c44e52-0884-4e6c-800a-2cdfb5f5e2a1-bot-87252-make-b-urban-ballet-paleta-01.jpg",
    banner:
      "https://res.cloudinary.com/beleza-na-web/image/upload/w_1500,f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/product/B87252/d5d50978-11d7-4f40-9cdc-bfb1e0ca523e-bot-87252-make-b-urban-ballet-paleta-03.jpg",
    nome: "Paleta de Sombras Make B. Urban Ballet",
    marca: "Make B.",
    descricao: `Em edição limitada, a coleção apaixonante que te conquistou em 2016 está de volta! A Paleta de Sombras Make B. Urban Ballet contém 12 tons, nudes e rosados, cuidadosamente selecionados para a construção de looks atemporais e sofisticados. Com longa duração, é ideal para acompanhar você em todas as ocasiões, mantendo a intensidade das cores ao longo do dia. Um ícone reinventado, pois o clássico é sempre tendência: Mais moderna, elegante e conectada com a nova Make B. -12 cores com diferentes efeitos: mate aveludado, super brilho e os novos efeitos cremosos e gel; -Longa duração de até 10 horas; -Textura macia e de fácil aplicação. Com diferentes acabamentos, esta paleta de sombras para os olhos traz como destaque suas sombras cremosas, ideais para serem utilizadas como base, intensificando as demais sombras e proporcionando maior profundidade ao olhar. Sua textura desliza suavemente sobre as pálpebras e cria uma cobertura contínua, permitindo a construção de camadas. Make B. traz de volta a icônica coleção Urban Ballet, uma linha que combina a delicadeza e elegância do ballet clássico à modernidade e à atitude do ambiente urbano.`,
    volume: "14,4 ml",
    familia_olfativa: null,
    concentracao: null,
    preco: 159.9,
    qtde_estoque: 10,
    lancamento: false,
    promocao: true,
    tempo_promocao: "15 days",
    banner_promocao: null,
    descricao_promocao: null,
    preco_promocao: 127.9,
  },
  {
    id_produto: 9,
    codigo_produto: "B2023111753",
    imagem:
      "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:eco,w_80/v1/imagens/product/B2023111753/9fdee897-66da-4263-b3bc-e3f1b8f68579-bot-2023111753-match-hidratacao-brilho-condicionador-refil.jpg",
    banner: null,
    nome: "Combo Match Hidratação e Brilho: Condicionador 280ml + Refil 250ml",
    marca: "Match",
    descricao: `O Combo Match Hidratação e Brilho traz a ciência de Match para cuidar do seu cabelo e também do planeta com a embalagem refil que usa 70% menos plástico. Este combo de condicionador traz itens fundamentais para a sua rotina de autocuidado: CONDICIONADOR: O Condicionador Match Hidratação e Brilho desembaraça e sela as cutículas capilares, garantindo fios mais macios e brilhantes. Recomendado para fios sem brilho e ressecados, entrega resultados imediatos que recuperam a saúde capilar: -24h de brilho e 3x mais maciez; -Efeito Hidra-Reflect: penetra na fibra hidratando para um brilho espelhado; -Sela a camada protetora da fibra; -Cutículas saudáveis para cabelos brilhantes, macios e sedosos. REFIL CONDICIONADOR: O Refil Condicionador Match Hidratação e Brilho desembaraça e sela as cutículas capilares, garantindo fios mais macios e brilhantes. Recomendado para fios sem brilho e ressecados, entrega resultados imediatos que recuperam a saúde capilar: -24h de brilho e 3x mais maciez; -Efeito Hidra-Reflect: penetra na fibra hidratando para um brilho espelhado; -Sela a camada protetora da fibra; -Cutículas saudáveis para cabelos brilhantes, macios e sedosos.`,
    volume: null,
    familia_olfativa: null,
    concentracao: null,
    preco: 87.8,
    qtde_estoque: 7,
    lancamento: true,
    promocao: false,
    tempo_promocao: null,
    banner_promocao: null,
    descricao_promocao: null,
    preco_promocao: null,
  },
  {
    id_produto: 10,
    codigo_produto: "B45025",
    imagem:
      "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:eco,w_80/v1/imagens/product/B45025/5e48a9a4-be3f-4989-a05d-4e15dcd3d771-bot-45025-bolsa-boti-baby-frontal-01.jpg",
    banner: null,
    nome: "Frasqueira Com Trocador Boti Baby",
    marca: "Boti Baby",
    descricao: `A Boti Baby Frasqueira com Trocador é prática e moderna: possui tamanho ideal para levar tudo que for preciso para sair com o bebê. Dimensões: 22,5 x 22,5 x 12 cm.`,
    volume: null,
    familia_olfativa: null,
    concentracao: null,
    preco: 144.9,
    qtde_estoque: 11,
    lancamento: false,
    promocao: true,
    tempo_promocao: "25 days",
    banner_promocao: null,
    descricao_promocao: null,
    preco_promocao: 71.9,
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
