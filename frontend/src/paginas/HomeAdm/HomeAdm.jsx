import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxArchive,
  faClipboardList,
  faFileSignature,
  faCheckToSlot,
} from "@fortawesome/free-solid-svg-icons";

const HomeAdm = () => {
  return (
    <div className="d-flex flex-column align-items-center gap-5">
      <div className="d-flex flex-column align-items-center gap-1">
        <h1 className="">Bem-vindo Administrador</h1>
        <h5 className="text-muted">O que você deseja fazer?</h5>
      </div>

      <div className="d-flex flex-column gap-4">
        <div className="d-flex gap-4">
          <Link to="">
            <div
              className="d-flex flex-column align-items-center justify-content-center shadow-sm hover-shadow p-3 rounded gap-2"
              style={{
                height: "200px",
                width: "400px",
                border: "1px solid #ccc",
              }}
            >
              <h3 className="card-title">Conferir Estoque</h3>
              <FontAwesomeIcon
                icon={faBoxArchive}
                style={{ fontSize: "3.5rem" }}
              />
            </div>
          </Link>

          <Link>
            <div
              className=" d-flex flex-column align-items-center justify-content-center shadow-sm hover-shadow p-3 rounded gap-2"
              style={{
                height: "200px",
                width: "400px",
                border: "1px solid #ccc",
              }}
            >
              <h3 className="card-title">Gerenciar Pedidos</h3>
              <FontAwesomeIcon
                icon={faClipboardList}
                style={{ fontSize: "3.5rem" }}
              />
            </div>
          </Link>
        </div>

        <div className="d-flex gap-4">
          <Link>
            <div
              className="d-flex flex-column align-items-center justify-content-center shadow-sm hover-shadow p-3 rounded gap-2"
              style={{
                height: "200px",
                width: "400px",
                border: "1px solid #ccc",
              }}
            >
              <h3 className="card-title">Cadastrar Produtos</h3>
              <FontAwesomeIcon
                icon={faFileSignature}
                style={{ fontSize: "3.5rem" }}
              />
            </div>
          </Link>

          <Link>
            <div className="col">
              <div
                className="d-flex flex-column align-items-center justify-content-center shadow-sm hover-shadow p-3 rounded gap-2"
                style={{
                  height: "200px",
                  width: "400px",
                  border: "1px solid #ccc",
                }}
              >
                <h3 className="card-title">Definir Promoções</h3>
                <FontAwesomeIcon
                  icon={faCheckToSlot}
                  style={{ fontSize: "3.5rem" }}
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeAdm;
