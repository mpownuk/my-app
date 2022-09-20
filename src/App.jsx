import React from "react";
import {useState} from "react";
import {Navigation} from './Components/Navigation/Navigation'
import {PokeDex} from './Components/PokeDex/PokeDex'
import { BattleGround } from "./Components/BattleGround/BattleGround"
import { Stats } from "./Components/Stats/Stats";

export function App() {
    const appComponentsNames = ['PokeDex','BattleGround','Stats']

    const [displayIem, setDisplayItem] = useState(['block','none','none'])
    const [battlePoke, setBattlePoke] = useState(localStorage.getItem('chosenPokemon'))

    const displayHandler = (displayValues) => {
        setDisplayItem(displayValues)
    }

    const setMyPokemon = () => {
        setBattlePoke(localStorage.getItem('chosenPokemon'))
    }

    return (
        <div> 
        <Navigation onClick={displayHandler} setPoke={setMyPokemon} value={appComponentsNames}/>
        <PokeDex style={{display: displayIem[0]}}/>
        <BattleGround style={{display: displayIem[1]}} battlePoke={battlePoke}/>
        <Stats style={{display: displayIem[2]}}/>
     </div>
    )
}