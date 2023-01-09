import React from "react";
import { UserPokemon } from "./UserPokemon";
import { EnemyPokemon } from "./EnemyPokemon";
import "../../styles/BattleGround/BattleGround.css";

export const BattleGround = ({ style, battlePoke }) => {
  const parsedBattlePoke = JSON.parse(battlePoke);
  console.log(parsedBattlePoke);

  return (
    <div className="battleground" style={style}>
      <div className="FlexBox">
        {parsedBattlePoke ? (
          <UserPokemon battlePoke={parsedBattlePoke.name} />
        ) : (
          <p>SELECT POKEMON FIRST</p>
        )}
        <EnemyPokemon />
      </div>
    </div>
  );
};
