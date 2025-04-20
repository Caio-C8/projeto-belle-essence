import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favoritos from "./paginas/Favoritos/Favoritos";
import Carrinho from "./paginas/Carrinho/Carrinho";
import FormCadastro from "./componentes/FormCadastro/FormCadastro";
import Login from "./componentes/Login/Login";
import RotaPrivada from "./componentes/RotaPrivada/RotaPrivada";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<FormCadastro />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/carrinho"
          element={
            <RotaPrivada>
              <Carrinho />
            </RotaPrivada>
          }
        />

        <Route
          path="/lista-favoritos"
          element={
            <RotaPrivada>
              <Favoritos />
            </RotaPrivada>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
