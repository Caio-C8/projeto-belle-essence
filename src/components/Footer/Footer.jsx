import React from "react";
import "./Footer.css";
import { FaRegImage } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { IoLogoFacebook } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <FaRegImage className="footer__logo__img" />
        </div>

        <div className="footer__social">
          <p className="footer__social__title">Redes Sociais</p>

          <div className="footer__social__icons">
            <IoLogoInstagram className="footer__social__icon" />
            <IoLogoFacebook className="footer__social__icon" />
          </div>
        </div>
      </div>

      <div className="footer__address">
        <p>Rua Romualdo Mendonça, 805 - João Pineiro, MG - (38) 98801-6588</p>
      </div>
    </footer>
  );
};

export default Footer;
