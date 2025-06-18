import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProvedorAutenticacao } from "./contexto/AutenticarContexto";
import { ProvedorFavoritos } from "./contexto/FavoritosContexto";
import { ProvedorCarrinho } from "./contexto/CarrinhoContexto";
import { ProvedorEndereco } from "./contexto/EnderecosContexto";
import { ProvedorCliente } from "./contexto/ClienteContexto";
import { ProvedorPedidos } from "./contexto/PedidosContexto";

import RotaApenasNaoLogado from "./rotas/RotaApenasNaoLogado";
import RotaProtegidaAdmin from "./rotas/RotaProtegidaAdmin";
import RotaProtegidaCliente from "./rotas/RotaProtegidaCliente";
import RotaAcessarCheckout from "./rotas/RotaAcessarCheckout";
import RotaPublicaNaoAdmin from "./rotas/RotaPublicaNaoAdmin";

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
import { ProvedorProdutos } from "./contexto/ProdutosContexto";
import { ProvedorCategorias } from "./contexto/CategoriasContexto";
import HomeAdm from "./paginas/HomeAdm/HomeAdm";

// Pesquisa pelo código do produto

const App = () => {
  return (
    <ProvedorAutenticacao>
      <ProvedorFavoritos>
        <ProvedorCarrinho>
          <ProvedorEndereco>
            <ProvedorCliente>
              <ProvedorPedidos>
                <ProvedorProdutos>
                  <ProvedorCategorias>
                    <BrowserRouter>
                      <ScrollCima />
                      <ResetAoTrocarPagina>
                        <Header />
                        <main>
                          <Routes>
                            {/* ------ Rotas Públicas ------ */}
                            <Route
                              path="/"
                              element={
                                <RotaPublicaNaoAdmin>
                                  <Home />
                                </RotaPublicaNaoAdmin>
                              }
                            />

                            <Route
                              path="/cadastro"
                              element={
                                <RotaApenasNaoLogado>
                                  <FormCadastro />
                                </RotaApenasNaoLogado>
                              }
                            />

                            <Route
                              path="/login"
                              element={
                                <RotaApenasNaoLogado>
                                  <Login />
                                </RotaApenasNaoLogado>
                              }
                            />

                            <Route
                              path="/alterar-senha"
                              element={
                                <RotaApenasNaoLogado>
                                  <EsqueceuSenha />
                                </RotaApenasNaoLogado>
                              }
                            />

                            <Route
                              path="/produto/:id"
                              element={
                                <RotaPublicaNaoAdmin>
                                  <Produto />
                                </RotaPublicaNaoAdmin>
                              }
                            />

                            <Route
                              path="/pesquisa"
                              element={
                                <RotaPublicaNaoAdmin>
                                  <Pesquisa />
                                </RotaPublicaNaoAdmin>
                              }
                            />

                            <Route
                              path="/pesquisa/categoria/:categoria"
                              element={
                                <RotaPublicaNaoAdmin>
                                  <Pesquisa />
                                </RotaPublicaNaoAdmin>
                              }
                            />
                            {/* ------ Rotas Públicas ------ */}

                            {/* ------ Rotas Clientes ------ */}

                            <Route
                              path="/checkout"
                              element={
                                <RotaProtegidaCliente>
                                  <RotaAcessarCheckout>
                                    <Checkout />
                                  </RotaAcessarCheckout>
                                </RotaProtegidaCliente>
                              }
                            />

                            <Route
                              path="/carrinho"
                              element={
                                <RotaProtegidaCliente>
                                  <Carrinho />
                                </RotaProtegidaCliente>
                              }
                            />

                            <Route
                              path="/lista-favoritos"
                              element={
                                <RotaProtegidaCliente>
                                  <Favoritos />
                                </RotaProtegidaCliente>
                              }
                            />

                            <Route
                              path="/perfil"
                              element={
                                <RotaProtegidaCliente>
                                  <Perfil />
                                </RotaProtegidaCliente>
                              }
                            />
                            {/* ------ Rotas Clientes ------ */}

                            {/* ------ Rotas Admin ------ */}
                            <Route
                              path="/adm/"
                              element={
                                <RotaProtegidaAdmin>
                                  <HomeAdm />
                                </RotaProtegidaAdmin>
                              }
                            />
                            {/* ------ Rotas Admin ------ */}
                          </Routes>
                        </main>
                        <Footer />
                      </ResetAoTrocarPagina>
                    </BrowserRouter>
                  </ProvedorCategorias>
                </ProvedorProdutos>
              </ProvedorPedidos>
            </ProvedorCliente>
          </ProvedorEndereco>
        </ProvedorCarrinho>
      </ProvedorFavoritos>
    </ProvedorAutenticacao>
  );
};

export default App;
