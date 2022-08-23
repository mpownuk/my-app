import React, {useEffect, useState} from "react"
import {PokeInput} from './Input.js'
import {PokeSubmit} from './Submit.js'
import {Previous} from './Prev.js'
import {Next} from './Next.js'
import {PokeRandom} from "./RandomBtn.js"
import {PokeTemplate} from './Poketemplate.js'
import {PokeContainer} from './PokeContainer.js'


// class PokeSearch extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       input: '',
//       submit: '',
//       // pokeName: '',
//       pokeImage: '',
//       pokeList: [],
//       currentPokemon: 0,
//       flag: true
//     }
    
//     this.handleChange = this.handleChange.bind(this) // czemu arrow function ignoruje preventDefault???
//     this.handleSubmit = this.handleSubmit.bind(this)
//     this.getRandomPokemon = this.getRandomPokemon.bind(this)
//   }

//   showPreviousPokemon() {
//     this.setState(state => {
//       if(state.currentPokemon <= 1) {
//         return
//       } else {
//         state.currentPokemon--
//         state.submit = state.pokeList[state.currentPokemon -1]
//         state.flag = false
//         this.handlePokeApi()
//       }
//     },()=> console.log(this.state.currentPokemon)
//     )
//   }

//   showNextPokemon() {
//     this.setState(state => {
//       if(state.currentPokemon >= this.state.pokeList.length) {
//         return
//       } else {
//         state.currentPokemon++
//         state.submit = state.pokeList[state.currentPokemon -1]
//         state.flag = false
//         this.handlePokeApi()
//       }
//     },()=> console.log(this.state.currentPokemon)
//     )
//   }

//   handleChange(e){
//     this.setState({
//       input: e.target.value
//     })
//   }

//   handleSubmit(e) {
//     e.preventDefault()
//     this.setState({
//       submit: this.state.input
//     }, () => {
//       this.handlePokeApi()
//       }
//     )
//   }

//   handlePokeApi() {
//     let pokemon = `https://pokeapi.co/api/v2/pokemon/${this.state.submit}`.toLowerCase()
//     fetch(pokemon)
//     .then((res)=> {
//       if (res.ok) {
//         return res.json()
//       } else {
//         this.setState({
//           pokeName: "There is no such Pokemon!"
//         })
//       }
//     })
//     .then((data)=> {
//       this.handlePokeData(data)
//     })
//   }

//   getRandomPokemon() {
//     fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
//     .then((res)=> res.json())
//     .then((data)=> {
//       let pokeCount = data.count
//       let randomNumber = Math.ceil(Math.random()*pokeCount)
//       let randomPokeUrl = data.results[randomNumber].url
//       fetch(randomPokeUrl)
//       .then((randomRes)=> randomRes.json())
//       .then((data)=> {
//         this.handlePokeData(data)
//       })
//     })
//   }

//   handlePokeData(data) {
//     let name = data.species.name.toUpperCase()
//     let image = data.sprites.other['official-artwork'].front_default
//       let listOfPokes = this.state.pokeList.slice()
//       if (this.state.flag) {
//         listOfPokes.push(data.species.name)
//         this.setState({
//           currentPokemon: listOfPokes.length
//         })
//       }
//       this.setState({
//         pokeName:name,
//         pokeImage:image,
//         pokeList: listOfPokes,
//         flag: true

//       }, ()=> console.log(this.state.pokeList.length, this.state.currentPokemon, this.state.pokeList))
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit} className="flexBox">
//           <PokeInput onChange={this.handleChange} value={this.state.value}/>
//           <PokeSubmit input={this.state.input}/>
//         </form>
//         <div className="flexBox flexColumn">
//           <PokeTemplate name={this.state.pokeName} image= {this.state.pokeImage}/>
//           <PokeRandom onClick={this.getRandomPokemon}/>
//         </div>
//         <div className="flexBox">
//           <Previous onClick={()=> this.showPreviousPokemon()}/>
//           <Next onClick={()=>{this.showNextPokemon()}}/>
//         </div>
//         <PokeContainer />
//       </div>
//     )
//   }
// }


export function Main() {
  const [input, setInput] = useState('')
  const [submit, setSubmit] = useState('')
  const [pokeName, setPokeName] = useState('')
  const [pokeImage, setPokeImage] = useState('')
  const [pokeList, setPokeList] = useState([])
  const [currentPokemon, setCurrentPokemon] = useState(0)
  const [flag, setFlag] = useState(true)

  const getRandomPokemon = ()=>{
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    .then((res)=> res.json())
    .then((data)=> {
      let pokeCount = data.count
      let randomNumber = Math.ceil(Math.random()*pokeCount)
      let randomPokeUrl = data.results[randomNumber].url
      fetch(randomPokeUrl)
      .then((randomRes)=> randomRes.json())
      .then((data)=> {
        handlePokeData(data)
        setFlag(true)

        console.log('input ',input,'submit ',submit, 'pokename ',pokeName)

      })
    })
  }

  const handlePokeData = (data) => {
    let name = data.species.name.toUpperCase()
    let image = data.sprites.other['official-artwork'].front_default
      let listOfPokes = pokeList.slice()
      if (flag) {
        listOfPokes.push(data.species.name)
          setCurrentPokemon(listOfPokes.length)
      }
        setPokeName(name)
        setPokeImage(image)
        setPokeList(listOfPokes)
        setFlag(true)
  }

  const handlePokeApi = () => {
    let pokemon = `https://pokeapi.co/api/v2/pokemon/${submit}`.toLowerCase()
    fetch(pokemon)
    .then((res)=> {
      if (res.ok) {
        return res.json()
      } else {
        setPokeName(
          "There is no such Pokemon!"
        )
      }
    })
    .then((data)=> {
      handlePokeData(data)
    })
  }

  useEffect(()=>{console.log(pokeList.length, currentPokemon, pokeList, submit)})

  const  showPreviousPokemon = () => {
      console.log('input ',input,'submit ',submit, 'pokename ',pokeName)
      if(currentPokemon <= 1) {
        return
      } else {
        setCurrentPokemon(currentPokemon-1)
        setSubmit(pokeList[currentPokemon -2])
        setFlag(false)
      }
  }

  const showNextPokemon = () => {
    console.log('input ',input,'submit ',submit, 'pokename ',pokeName)
      if(currentPokemon >= pokeList.length) {
        return
      } else {
        setCurrentPokemon(currentPokemon+1)
        setSubmit(pokeList[currentPokemon])
        setFlag(false)
      }
  }

  const handleChange = (e) => {
    setInput(
      e.target.value
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmit(input)
    setFlag(true)
  }

    useEffect(()=>{handlePokeApi()},[submit])
  
  return (
    <div>
      <form onSubmit={handleSubmit} className="flexBox">
        <PokeInput onChange={handleChange}/>
        <PokeSubmit input={input}/>
      </form>
      <div className="flexBox flexColumn">
        <PokeTemplate name={pokeName} image={pokeImage}/>
        <PokeRandom onClick={getRandomPokemon}/>
      </div>
      <div className="flexBox">
        <Previous onClick={()=> showPreviousPokemon()}/>
        <Next onClick={()=>{showNextPokemon()}}/>
      </div>
      <PokeContainer />
    </div>
  )

}

