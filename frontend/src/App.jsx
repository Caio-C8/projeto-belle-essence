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
import { ProvedorPedidos } from "./contexto/PedidosContexto";
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
import RotaRestritaUsuario from "./rotas/RotaRestritaUsuario";
import RotaAcessarCheckout from "./rotas/RotaAcessarCheckout";
import { ProvedorProdutos } from "./contexto/ProdutosContexto";
import { ProvedorCategorias } from "./contexto/CategoriasContexto";

const App = () => {
  return (
    <ProvedorAutenticacao>
      <ProvedorFavoritos>
        <ProvedorCarrinho>
          <ProvedorEndereco>
            <ProvedorCliente>
              <ProvedorProduto>
                <ProvedorPedidos>
                  <ProvedorProdutos>
                    <ProvedorCategorias>
                      <BrowserRouter>
                        <ScrollCima />
                        <ResetAoTrocarPagina>
                          <Header />
                          <main>
                            <Routes>
                              <Route path="/" element={<Home />} />

                              <Route
                                path="/cadastro"
                                element={
                                  <RotaRestritaUsuario>
                                    <FormCadastro />
                                  </RotaRestritaUsuario>
                                }
                              />

                              <Route
                                path="/login"
                                element={
                                  <RotaRestritaUsuario>
                                    <Login />
                                  </RotaRestritaUsuario>
                                }
                              />

                              <Route
                                path="/alterar-senha"
                                element={
                                  <RotaRestritaUsuario>
                                    <EsqueceuSenha />
                                  </RotaRestritaUsuario>
                                }
                              />

                              <Route
                                path="/produto/:id"
                                element={<Produto />}
                              />

                              <Route path="/pesquisa" element={<Pesquisa />} />
                              <Route
                                path="/pesquisa/categoria/:categoria"
                                element={<Pesquisa />}
                              />

                              <Route
                                path="/checkout"
                                element={
                                  <RotaAcessarCheckout>
                                    <Checkout />
                                  </RotaAcessarCheckout>
                                }
                              />

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
                    </ProvedorCategorias>
                  </ProvedorProdutos>
                </ProvedorPedidos>
              </ProvedorProduto>
            </ProvedorCliente>
          </ProvedorEndereco>
        </ProvedorCarrinho>
      </ProvedorFavoritos>
    </ProvedorAutenticacao>
  );
};

export default App;
