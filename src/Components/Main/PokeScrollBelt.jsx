import React, { useRef, useState} from "react"
import { Next } from "./Next"
import {Prev} from "./Prev"

export const PokeContainer = ({pokeList, pictures, func}) => {

    const [mouseEntry, setMouseEntry] = useState(0)
    const [mouseIsDown, setMouseIsDown] = useState(false)

    const movableEl = useRef(null)

    const moveBar = (item, distance, step) => {
        let breakPoint = 0
        const movement = setInterval(()=>{
            item.scrollLeft += step
            breakPoint += Math.abs(step)
            if (breakPoint >= distance) {
                clearInterval(movement)
            }
        },5)
    }

    const mouseDownHandler = (event) => {
        setMouseIsDown(true)
        setMouseEntry(event.touches[0].clientX + movableEl.current.scrollLeft)
    }

    const mouseUpHandler = () => {
    setMouseIsDown(false)
    }

    const contMove = (event) => {
        if(mouseIsDown) {
            let offset = mouseEntry
            movableEl.current.scrollLeft = (offset - event.clientX )
            console.log(event.touches[0].clientX, mouseEntry)
        }
    }

    return (
        <div className="poke--scrollbelt">
            <Prev className='hidden--button' value={'<'} onClick={()=>{moveBar(movableEl.current, 254, -10)}}/>
            <div className="poke--scrollbelt__elements" ref={movableEl} onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler} onMouseMove={contMove}>
            {
                pokeList.map((poke, idx)=>{
                    return (
                        <span className="poke--scrollbelt__item" key={poke} >
                            <img className="poke--scrollbelt__icon" src={`${pictures[idx]}` } alt=" "></img>
                            <p>Select:</p>
                            <button onClick={()=>{func(poke)}}>{poke.toUpperCase()}</button>
                        </span>
                    )
                })
            }
            </div>
            <Next className='hidden--button' value={'>'} onClick={()=>moveBar(movableEl.current, 254, 10)}/>
        </div>
    )
}