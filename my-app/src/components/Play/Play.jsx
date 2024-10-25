import React from "react";
import { Link } from "react-router-dom";
import "./Play.css";
import title from "../../assets/play-title.png";
import btn1 from "../../assets/btn1.png";
import btn2 from "../../assets/btn2.png";
import btn3 from "../../assets/btn3.png";

const Play = () => {
  return (
    <section className="play">
      <div className="play-container">
        <img src={title} alt="Game Title Image" />

        <div className="game-buttons">
          <Link to="/startgame" className="game-button">
            <img src={btn1} alt="Snakes and Ladders" />
          </Link>
          <Link to="/start-trivia" className="game-button">
            <img src={btn2} alt="Samvidhaan Encoded" />
          </Link>
          <Link to="/match-start" className="game-button">
            <img src={btn3} alt="Samvidhaan Connect" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Play;
