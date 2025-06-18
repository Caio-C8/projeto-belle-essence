import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes
import Header from "./componentes/Header/Header";
import Footer from "./componentes/Footer/Footer";

// Utilidades
import ScrollCima from "./utilidades/ScrollCima";
import ResetAoTrocarPagina from "./utilidades/ResetAoTrocarPagina";

// Provedores de Contexto
import { ProvedorAutenticacao } from "./contexto/AutenticarContexto";
import { ProvedorFavoritos } from "./contexto/FavoritosContexto";
import { ProvedorCarrinho } from "./contexto/CarrinhoContexto";
import { ProvedorEndereco } from "./contexto/EnderecosContexto";
import { ProvedorCliente } from "./contexto/ClienteContexto";
import { ProvedorPedidos } from "./contexto/PedidosContexto";
import { ProvedorProdutos } from "./contexto/ProdutosContexto";
import { ProvedorCategorias } from "./contexto/CategoriasContexto";

// Restrição de Rotas
import RotaApenasNaoLogado from "./rotas/RotaApenasNaoLogado";
import RotaProtegidaAdmin from "./rotas/RotaProtegidaAdmin";
import RotaProtegidaCliente from "./rotas/RotaProtegidaCliente";
import RotaAcessarCheckout from "./rotas/RotaAcessarCheckout";
import RotaPublicaNaoAdmin from "./rotas/RotaPublicaNaoAdmin";

// Páginas Públicas
import Home from "./paginas/Publico/Home/Home";
import Cadastro from "./paginas/Publico/Cadastro/Cadastro";
import Login from "./paginas/Publico/Login/Login";
import EsqueceuSenha from "./paginas/Publico/EsqueceuSenha/EsqueceuSenha";
import ProdutoDetalhado from "./paginas/Publico/ProdutoDetalhado/ProdutoDetalhado";
import Pesquisa from "./paginas/Publico/Pesquisa/Pesquisa";

// Páginas de Clientes
import Favoritos from "./paginas/Cliente/Favoritos/Favoritos";
import Carrinho from "./paginas/Cliente/Carrinho/Carrinho";
import Perfil from "./paginas/Cliente/Perfil/Perfil";
import Checkout from "./paginas/Cliente/Checkout/Checkout";

// Páginas de Administrador
import HomeAdm from "./paginas/Admin/HomeAdm/HomeAdm";

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
                                  <Cadastro />
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
                                  <ProdutoDetalhado />
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
