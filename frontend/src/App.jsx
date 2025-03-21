import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Carrinho from "./pages/Carrinho/Carrinho";
import Pesquisa from "./pages/Pesquisa/Pesquisa";
import Favoritos from "./pages/Favoritos/Favoritos";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pesquisa" element={<Pesquisa />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
