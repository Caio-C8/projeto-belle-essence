import React from "react";
import { IoBagOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { FaRegImage } from "react-icons/fa6";
import { PiCircleHalfFill } from "react-icons/pi";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <FaRegImage className="header__logo__img" />
      </div>

      <div className="header__search-bar">
        <input
          className="header__search-bar__input"
          type="text"
          placeholder="Procure por produtos"
        />
        <IoIosSearch className="header__search-bar__icon" />
      </div>

      <div className="header__options">
        <div className="header__options__item">
          <PiCircleHalfFill className="header__options__icon" />
        </div>

        <div className="header__options__item">
          <IoPersonOutline className="header__options__icon" />
        </div>

        <div className="header__options__item">
          <IoHeartOutline className="header__options__icon" />
          <span className="header__options__badge">0</span>
        </div>

        <div className="header__options__item">
          <IoBagOutline className="header__options__icon" />
          <span className="header__options__badge">0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
