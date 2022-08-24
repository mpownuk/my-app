import React, {useRef} from "react"
import { Next } from "./Next"
import {Prev} from "./Prev"

export const PokeContainer = ({pokeList, pictures, func}) => {

    const movableEl = useRef(null)

    const scrollBar = (item, distance, step) => {
        let breakPoint = 0
        const movement = setInterval(()=>{
            item.scrollLeft += step
            breakPoint += Math.abs(step)
            if (breakPoint >= distance) {
                clearInterval(movement)
            }
        },5)
    }

    return (
        <div className="poke--container">
            <Prev value={'<'} onClick={()=>{scrollBar(movableEl.current, 404, -10)}}/>
            <div className="poke--container__items" ref={movableEl}>
            {
                pokeList.map((poke, idx)=>{
                    return (
                        <button className="poke--item" key={poke} onClick={()=>{func(poke)}}>
                            <img className="poke--icon" src={`${pictures[idx]}` } alt=" "></img>
                            <p>{poke.toUpperCase()}</p>
                        </button>
                    )
                })
            }
            </div>
            <Next value={'>'} onClick={()=>scrollBar(movableEl.current, 404, 10)}/>
        </div>
    )
}