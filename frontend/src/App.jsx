import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RotaProtegida from "./rotas/RotaProtegida";
import { ProvedorAutenticacao } from "./contexto/AutenticarContexto";
import { ProvedorFavoritos } from "./contexto/FavoritosContexto";
import { ProvedorCarrinho } from "./contexto/CarrinhoContexto";
import { ProvedorEndereco } from "./contexto/EnderecosContexto";
import { ProvedorCliente } from "./contexto/ClienteContexto";
import { ProvedorProduto } from "./contexto/ProdutoContexto";
import ScrollCima from "./utilidades/ScrollCima";
import ResetAoTrocarPagina from "./utilidades/ResetAoTrocarPagina";
import Header from "./componentes/Header/Header";
import Footer from "./componentes/Footer/Footer";
import Home from "./paginas/Home/Home";
import Favoritos from "./paginas/Favoritos/Favoritos";
import Carrinho from "./paginas/Carrinho/Carrinho";
import Perfil from "./paginas/Perfil/Perfil";
import FormCadastro from "./paginas/Cadastro/Cadastro";
import Login from "./paginas/Login/Login";
import EsqueceuSenha from "./paginas/EsqueceuSenha/EsqueceuSenha";
import Produto from "./paginas/ProdutoDetalhado/ProdutoDetalhado";
import Pesquisa from "./paginas/Pesquisa/Pesquisa";
import Checkout from "./paginas/Checkout/Checkout";

const App = () => {
  return (
    <ProvedorAutenticacao>
      <ProvedorFavoritos>
        <ProvedorCarrinho>
          <ProvedorEndereco>
            <ProvedorCliente>
              <ProvedorProduto>
                <BrowserRouter>
                  <ScrollCima />
                  <ResetAoTrocarPagina>
                    <Header />
                    <main>
                      <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/cadastro" element={<FormCadastro />} />

                        <Route path="/login" element={<Login />} />

                        <Route
                          path="/alterar-senha"
                          element={<EsqueceuSenha />}
                        />

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
                  </ResetAoTrocarPagina>
                </BrowserRouter>
              </ProvedorProduto>
            </ProvedorCliente>
          </ProvedorEndereco>
        </ProvedorCarrinho>
      </ProvedorFavoritos>
    </ProvedorAutenticacao>
  );
};

export default App;
