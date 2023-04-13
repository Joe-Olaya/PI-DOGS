import React from "react";
import { Link } from "react-router-dom";
import style from "../LandingPage/LandingPage.module.css";
import "../LandingPage/ButtonHome.css"

function LandingPage() {
  return (
    <div className={`${style.main_container}`}>
      <div className={`${style.main_left_container}`}>
        <h1 className={`${style.titleApp}`} >Welcome to Caninófilos!</h1>
        <div className={`${style.left_paragraph}`}>
          <p>We're glad to have you here, in our community dedicated to dog lovers. In this space, you can find useful information about different dog breeds names and details such as their size, life expectancy and temperament, and you can also add new ones</p>
        </div>
        
        <Link to="/home">
            <button className="button_home">Go home</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
