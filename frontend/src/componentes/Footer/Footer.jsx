import React from "react";
import { Link } from "react-router-dom";

import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="border-top py-4 px-3 text-center text-md-start">
      <div className="container-fluid">
        {/* Conteúdo principal */}
        <div className="row align-items-center justify-content-between gy-4">
          {/* Logo - ocupa linha inteira no mobile, lateral no desktop */}
          <div className="col-12 col-md-4 text-center text-md-start">
            <div className="logo">
              <img
                src="../../src/assets/img/logoBelleEssence.png"
                alt="Logo Belle Essence"
                style={{ height: "100px" }}
              />
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="col-12 col-md-4 text-center text-md-end">
            <p className="fw-bold fs-5 mb-2">Redes Sociais</p>
            <div className="d-flex justify-content-center justify-content-md-end gap-4">
              <Link
                onClick={() => {
                  return (
                    window.open(
                      "https://www.instagram.com/elianeangelicadefreitas/"
                    ),
                    "_blank"
                  );
                }}
              >
                <IoLogoInstagram className="footer-icon" />
              </Link>
              <Link
                onClick={() => {
                  return (
                    window.open(
                      "https://www.facebook.com/elianeangelicadefreitas"
                    ),
                    "_blank"
                  );
                }}
              >
                <IoLogoFacebook className="footer-icon" />
              </Link>
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div className="row mt-4">
          <div className="col-12 text-center">
            <p className="mb-0">
              Rua Romualdo Mendonça, 805 - João Pinheiro, MG - (38) 98801-6588
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
