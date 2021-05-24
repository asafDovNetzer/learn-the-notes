import React from "react";
import Game from "./Game/Game";
import classes from "./Games.module.css";

const games = (props) => {
  let games = (
    <ul>
      {props.answersArray.map((game, index) => (
        <Game
          key={game.id}
          game={game}
          index={props.answersArray.length - index - 1}
          symbols={props.symbols}
        />
      ))}
    </ul>
  );

  if (props.answersArray.length === 0) {
    games = (
      <div className={classes.NoGames}>
        <p>No games played yet...</p>
      </div>
    );
  }

  let gamesDiv = (
    <div className={classes.Games}>
      <div className={classes.TableHead}>
        <p></p>
        <p>Clef</p>
        <p>Note</p>
        <p>Time</p>
        <p>Tries</p>
      </div>
      {games}
    </div>
  );

  if (props.display) {
    gamesDiv = null;
  }

  return gamesDiv;
};

export default games;
