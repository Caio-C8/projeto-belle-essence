import React, { useState, useEffect } from "react";
import { fetchApi } from "../../../api/requisicoes";
import ImagensCarrossel from "../../componentes/Carrosel/ImagensCarrossel";
import ProdutosCarrossel from "../../componentes/Carrosel/ProdutosCarrosel";

const Home = () => {
  // const [produtos, setProdutos] = useState([]);

  // useEffect(() => {
  //   const carregarDados = async () => {
  //     const dadosRequisitados = await fetchApi("produtos");

  //     setProdutos(dadosRequisitados);
  //   };

  //   carregarDados();
  // }, []);

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
        "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:eco,w_80/v1/imagens/product/B2025030512/bca2f0b6-0a73-48dd-b1f9-8b37755c0e1b-bot-2025030512.jpg",
      banner:
        "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:low,w_1220/v1/banner/2025_03_20_12_23_42_4/f811eec8-c6c4-4e28-8328-447e36bf9fc3-menenba-25c05-billboard-desk-2440x750.jpg",
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
        "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:eco,w_80/v1/imagens/product/B2025030512/bca2f0b6-0a73-48dd-b1f9-8b37755c0e1b-bot-2025030512.jpg",
      banner:
        "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:low,w_1220/v1/banner/2025_03_20_12_23_42_4/f811eec8-c6c4-4e28-8328-447e36bf9fc3-menenba-25c05-billboard-desk-2440x750.jpg",
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
        "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:eco,w_80/v1/imagens/product/B2025030512/bca2f0b6-0a73-48dd-b1f9-8b37755c0e1b-bot-2025030512.jpg",
      banner:
        "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:low,w_1220/v1/banner/2025_03_20_12_23_42_4/f811eec8-c6c4-4e28-8328-447e36bf9fc3-menenba-25c05-billboard-desk-2440x750.jpg",
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
        "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:low,w_1220/v1/banner/2025_03_20_12_23_42_4/f811eec8-c6c4-4e28-8328-447e36bf9fc3-menenba-25c05-billboard-desk-2440x750.jpg",
      descricao_promocao:
        "Kit completo da linha Malbec Club com aroma marcante e cuidado diário para o homem moderno.",
      preco_promocao: 99.9,
    },
    {
      id_produto: 5,
      codigo_produto: "B2025040404",
      imagem:
        "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:eco,w_80/v1/imagens/product/B2025030512/bca2f0b6-0a73-48dd-b1f9-8b37755c0e1b-bot-2025030512.jpg",
      banner:
        "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:low,w_1220/v1/banner/2025_03_20_12_23_42_4/f811eec8-c6c4-4e28-8328-447e36bf9fc3-menenba-25c05-billboard-desk-2440x750.jpg",
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
        "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:low,w_1220/v1/banner/2025_03_20_12_23_42_4/f811eec8-c6c4-4e28-8328-447e36bf9fc3-menenba-25c05-billboard-desk-2440x750.jpg",
      descricao_promocao:
        "Floratta Red em promoção por tempo limitado, celebre sua essência com mais economia!",
      preco_promocao: 79.9,
    },
    {
      id_produto: 6,
      codigo_produto: "B2025050506",
      imagem:
        "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:eco,w_80/v1/imagens/product/B2025030512/bca2f0b6-0a73-48dd-b1f9-8b37755c0e1b-bot-2025030512.jpg",
      banner:
        "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:low,w_1220/v1/banner/2025_03_20_12_23_42_4/f811eec8-c6c4-4e28-8328-447e36bf9fc3-menenba-25c05-billboard-desk-2440x750.jpg",
      nome: "Quasar Desodorante Colônia 125ml",
      marca: "O Boticário",
      descricao: "Refrescante e energético com notas cítricas intensas.",
      volume: "125ml",
      familia_olfativa: "Cítrico",
      concentracao: "Desodorante Colônia",
      preco: 99.9,
      qtde_estoque: 20,
      lancamento: false,
      promocao: false,
    },
    {
      id_produto: 7,
      codigo_produto: "B2025050507",
      imagem:
        "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:eco,w_80/v1/imagens/product/B2025030512/bca2f0b6-0a73-48dd-b1f9-8b37755c0e1b-bot-2025030512.jpg",
      banner:
        "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:low,w_1220/v1/banner/2025_03_20_12_23_42_4/f811eec8-c6c4-4e28-8328-447e36bf9fc3-menenba-25c05-billboard-desk-2440x750.jpg",
      nome: "Arbo Ocean Desodorante Colônia 100ml",
      marca: "O Boticário",
      descricao: "Inspiração nos ventos e brisas marítimas, aroma leve.",
      volume: "100ml",
      familia_olfativa: "Aromático Fresco",
      concentracao: "Desodorante Colônia",
      preco: 109.9,
      qtde_estoque: 13,
      lancamento: true,
      promocao: true,
      tempo_promocao: "30 days",
      preco_promocao: 85.5,
    },
    {
      id_produto: 8,
      codigo_produto: "B2025050508",
      imagem:
        "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:eco,w_80/v1/imagens/product/B2025030512/bca2f0b6-0a73-48dd-b1f9-8b37755c0e1b-bot-2025030512.jpg",
      banner:
        "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:low,w_1220/v1/banner/2025_03_20_12_23_42_4/f811eec8-c6c4-4e28-8328-447e36bf9fc3-menenba-25c05-billboard-desk-2440x750.jpg",
      nome: "Egeo Dolce Desodorante Colônia 90ml",
      marca: "O Boticário",
      descricao: "A fragrância mais doce da linha Egeo, jovem e divertida.",
      volume: "90ml",
      familia_olfativa: "Gourmand",
      concentracao: "Desodorante Colônia",
      preco: 119.9,
      qtde_estoque: 10,
      lancamento: false,
      promocao: true,
      tempo_promocao: "15 days",
      preco_promocao: 95.0,
    },
    {
      id_produto: 9,
      codigo_produto: "B2025050509",
      imagem:
        "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:eco,w_80/v1/imagens/product/B2025030512/bca2f0b6-0a73-48dd-b1f9-8b37755c0e1b-bot-2025030512.jpg",
      banner:
        "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:low,w_1220/v1/banner/2025_03_20_12_23_42_4/f811eec8-c6c4-4e28-8328-447e36bf9fc3-menenba-25c05-billboard-desk-2440x750.jpg",
      nome: "Coffee Woman Seduction Eau de Toilette 100ml",
      marca: "O Boticário",
      descricao: "Notas florais com toque de baunilha e café.",
      volume: "100ml",
      familia_olfativa: "Oriental Gourmand",
      concentracao: "Eau de Toilette",
      preco: 159.9,
      qtde_estoque: 7,
      lancamento: true,
      promocao: false,
    },
    {
      id_produto: 10,
      codigo_produto: "B2025050510",
      imagem:
        "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:eco,w_80/v1/imagens/product/B2025030512/bca2f0b6-0a73-48dd-b1f9-8b37755c0e1b-bot-2025030512.jpg",
      banner:
        "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:low,w_1220/v1/banner/2025_03_20_12_23_42_4/f811eec8-c6c4-4e28-8328-447e36bf9fc3-menenba-25c05-billboard-desk-2440x750.jpg",
      nome: "Glamour Secrets Black Desodorante Colônia 75ml",
      marca: "O Boticário",
      descricao: "Fragrância misteriosa e sensual com notas adocicadas.",
      volume: "75ml",
      familia_olfativa: "Floral Oriental",
      concentracao: "Desodorante Colônia",
      preco: 114.9,
      qtde_estoque: 11,
      lancamento: false,
      promocao: true,
      tempo_promocao: "25 days",
      preco_promocao: 89.9,
    },
  ];

  return (
    <div className="">
      <ImagensCarrossel />
      <ProdutosCarrossel titulo="Mais Vendidos" produtos={produtos} />
      <ProdutosCarrossel titulo="Promoções" produtos={produtos} />
    </div>
  );
};

export default Home;
