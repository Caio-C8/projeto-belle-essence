import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProvedorAutenticacao } from "./contexto/AutenticarContexto";
import RotaProtegida from "./rotas/RotaProtegida";
import Home from "./paginas/Home/Home";
import Favoritos from "./paginas/Favoritos/Favoritos";
import Carrinho from "./paginas/Carrinho/Carrinho";
import Perfil from "./paginas/Perfil/Perfil";
import FormCadastro from "./componentes/FormCadastro/FormCadastro";
import Login from "./componentes/Login/Login";

const App = () => {
  return (
    <ProvedorAutenticacao>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/cadastro" element={<FormCadastro />} />

          <Route path="/login" element={<Login />} />

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
      </BrowserRouter>
    </ProvedorAutenticacao>
  );
};

export default App;
