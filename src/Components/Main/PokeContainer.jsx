import React, {useRef} from "react"
import { Next } from "./Next"
import {Prev} from "./Prev"

export const PokeContainer = ({pokeList, pictures}) => {

    const movableEl = useRef(null)

    const scrollBar = (item, distance) => {
        // setInterval(()=>{
        //     item.scrollLeft += distance
        // },50)
        item.scrollLeft += distance

    }

    return (
        <div className="poke--container">
            <Prev value={'prev'} onClick={()=>{scrollBar(movableEl.current, -100)}}/>
            <div className="poke--container__items" ref={movableEl}>
            {
                pokeList.map((poke, idx)=>{
                    return (
                        <div className="poke--item" key={poke}>
                            <img className="poke--icon" src={`${pictures[idx]}`}></img>
                            <p>{poke}</p>
                        </div>
                    )
                })
            }
            </div>
            <Next value={'next'} onClick={()=>scrollBar(movableEl.current, 100)}/>
        </div>
    )
}