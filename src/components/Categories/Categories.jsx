import React from "react";
import "./Categories.css";
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

const Categories = () => {
  return (
    <div className="categories">
      <div className="categories__wrapper">
        <div className="categories__menu">
          {categorias.map((categoria, index) => (
            <div key={index} className="category">
              <p className="category__text">{categoria}</p>
              <IoIosArrowDown className="category__icon" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
