import React, { useEffect, useRef, useState } from "react";
import "./Descricao.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Descricao = ({ produto }) => {
  const [abaSelecionada, setAbaSelecionada] = useState("descricao");
  const [expandido, setExpandido] = useState(false);
  const [mostrarBotao, setMostrarBotao] = useState(false);
  const descricaoRef = useRef(null);

  const descricaoSelecionada =
    abaSelecionada === "descricao"
      ? produto.descricao || ""
      : produto.descricao_promocao || "";

  useEffect(() => {
    if (!descricaoRef.current) return;

    const el = descricaoRef.current;
    const style = getComputedStyle(el);

    const paddingTop = parseFloat(style.paddingTop || "0");
    const paddingBottom = parseFloat(style.paddingBottom || "0");

    const paddingTotal = paddingTop + paddingBottom;

    const conteudoReal = el.scrollHeight - paddingTotal;
    const maxAltura = 160;

    setMostrarBotao(conteudoReal > maxAltura);
  }, [descricaoSelecionada, abaSelecionada]);

  return (
    <div className="descricao-container">
      <div className="d-flex">
        <button
          className={`tab-button flex-fill ${
            abaSelecionada === "descricao" ? "active" : ""
          }`}
          onClick={() => {
            setAbaSelecionada("descricao");
            setExpandido(false);
          }}
        >
          Descrição
        </button>
        {produto.descricao_promocao && (
          <button
            className={`tab-button flex-fill ${
              abaSelecionada === "promocao" ? "active" : ""
            }`}
            onClick={() => {
              setAbaSelecionada("promocao");
              setExpandido(false);
            }}
          >
            Promoção
          </button>
        )}
      </div>

      <p
        ref={descricaoRef}
        className={`descricao-texto ${expandido ? "expandido" : ""}`}
      >
        {descricaoSelecionada}
      </p>

      {mostrarBotao && (
        <div className="show-more-btn" onClick={() => setExpandido(!expandido)}>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`icone-seta ${expandido ? "rotacionar" : ""}`}
          />
        </div>
      )}
    </div>
  );
};

export default Descricao;
