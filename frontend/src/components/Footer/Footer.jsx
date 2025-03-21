import React from "react";
import "./Footer.css";
import { IoLogoInstagram } from "react-icons/io5";
import { IoLogoFacebook } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__conteudo">
        <div className="footer__logo">
          <img
            src="src/assets/img/logoBelleEssence.png"
            alt="Logo Belle Essence"
            className="footer__logo__image"
          />
        </div>

        <div className="footer__redes">
          <p className="footer__redes__titulo">Redes Sociais</p>

          <div className="footer__redes__icones">
            <a href="" target="_blank">
              <IoLogoInstagram className="footer__redes__icone" />
            </a>
            <a href="" target="_blank">
              <IoLogoFacebook className="footer__redes__icone" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__endereco">
        <p>Rua Romualdo Mendonça, 805 - João Pineiro, MG - (38) 98801-6588</p>
      </div>
    </footer>
  );
};

export default Footer;
