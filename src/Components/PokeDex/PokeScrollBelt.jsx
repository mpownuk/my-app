import React, { useRef, useState } from "react"
import { Button } from "./Button"


export const PokeScrollBelt = ({pokeList, pictures, func}) => {

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
        setMouseEntry(event.clientX + movableEl.current.scrollLeft)
    }

    const mouseUpHandler = () => {
    setMouseIsDown(false)
    }

    const contMove = (event) => {
        if(mouseIsDown) {
            let offset = mouseEntry
            movableEl.current.scrollLeft = (offset - event.clientX )
            console.log(event.clientX, mouseEntry)
        }
    }

    return (
        <div className="poke--scrollbelt">
            <Button className='hidden--button' value={'<'} onClick={()=>{moveBar(movableEl.current, 250, -10)}}/>
            <div className="poke--scrollbelt__elements" ref={movableEl} onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler} onMouseMove={contMove} onTouchStart={mouseDownHandler} onTouchEnd={mouseUpHandler} onTouchMove={contMove}>
            {
                pokeList.map((poke, idx)=>{
                    return (
                        <span className="poke--scrollbelt__item" key={poke} >
                            <img className="poke--scrollbelt__icon" src={`${pictures[idx]}` } alt=" "></img>
                            <p>Select:</p>
                            <button onClick={()=>{func(poke, idx)}}>{poke.toUpperCase()}</button>
                        </span>
                    )
                })
            }
            </div>
            <Button className='hidden--button' value={'>'} onClick={()=>moveBar(movableEl.current, 250, 10)}/>
        </div>
    )
}