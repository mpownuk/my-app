import React from 'react';
import { UserPokemon } from './UserPokemon'
import { EnemyPokemon } from './EnemyPokemon';
import './BattleGround.css'

export const BattleGround = ({style, battlePoke}) => {
    return <div className="battleground" style={style}>
        <div className="FlexBox">
            <UserPokemon battlePoke={battlePoke}/>
            <EnemyPokemon />
        </div>
    </div>
}