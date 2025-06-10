import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProvedorAutenticacao } from "./contexto/AutenticarContexto";
import RotaProtegida from "./rotas/RotaProtegida";
import Home from "./paginas/Home/Home";
import Favoritos from "./paginas/Favoritos/Favoritos";
import Carrinho from "./paginas/Carrinho/Carrinho";
import Perfil from "./paginas/Perfil/Perfil";
import FormCadastro from "./paginas/Cadastro/Cadastro";
import Login from "./paginas/Login/Login";
import Header from "./componentes/Header/Header";
import Footer from "./componentes/Footer/Footer";
import EsqueceuSenha from "./paginas/EsqueceuSenha/EsqueceuSenha";
import Produto from "./paginas/ProdutoDetalhado/ProdutoDetalhado";
import Pesquisa from "./paginas/Pesquisa/Pesquisa";
import Checkout from "./paginas/Checkout/Checkout";
import { ProvedorFavoritos } from "./contexto/FavoritosContexto";

const App = () => {
  return (
    <ProvedorAutenticacao>
      <ProvedorFavoritos>
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/cadastro" element={<FormCadastro />} />

              <Route path="/login" element={<Login />} />

              <Route path="/alterar-senha" element={<EsqueceuSenha />} />

              <Route path="/produto/:id" element={<Produto />} />

              <Route path="/pesquisa" element={<Pesquisa />} />

              <Route path="/checkout" element={<Checkout />} />

              <Route
                path="/carrinho"
                element={
                  <RotaProtegida tipo="cliente">
                    <Carrinho />
                  </RotaProtegida>
                }
              />

              <Route
                path="/lista-favoritos"
                element={
                  <RotaProtegida tipo="cliente">
                    <Favoritos />
                  </RotaProtegida>
                }
              />

              <Route
                path="/perfil"
                element={
                  <RotaProtegida tipo="cliente">
                    <Perfil />
                  </RotaProtegida>
                }
              />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </ProvedorFavoritos>
    </ProvedorAutenticacao>
  );
};

export default App;
