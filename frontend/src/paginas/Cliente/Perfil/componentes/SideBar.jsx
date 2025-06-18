import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faHouse,
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ pagina, setPagina, logout }) => {
  return (
    <div className="sidebar-menu">
      <button
        className={`menu-item ${pagina === "dados" ? "active" : ""}`}
        onClick={() => setPagina("dados")}
      >
        <FontAwesomeIcon icon={faUser} />
        Seus dados
      </button>

      <button
        className={`menu-item ${pagina === "pedidos" ? "active" : ""}`}
        onClick={() => setPagina("pedidos")}
      >
        <FontAwesomeIcon icon={faTruck} />
        Pedidos
      </button>

      <button
        className={`menu-item ${pagina === "enderecos" ? "active" : ""}`}
        onClick={() => setPagina("enderecos")}
      >
        <FontAwesomeIcon icon={faHouse} />
        Endereços
      </button>

      <button className="menu-item" onClick={() => logout()}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} />
        Sair
      </button>
    </div>
  );
};

export default Sidebar;
