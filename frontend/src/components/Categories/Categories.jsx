import React from "react";
import "./Categorias.css";
import { IoIosArrowDown } from "react-icons/io";

const categorias = [
  "Promoções",
  "Masculinos",
  "Femininos",
  "Infantis",
  "Perfumes",
  "Maquiagens",
  "Skincare",
  "Cabelos",
  "Cuidados com o Corpo",
];

const Categorias = () => {
  return (
    <div className="categorias">
      <div className="categorias__container">
        <div className="categorias__menu">
          {categorias.map((categoria, index) => (
            <div key={index} className="categoria">
              <p className="categoria__texto">{categoria}</p>
              <IoIosArrowDown className="categoria__icone" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categorias;
