
export function Main() {
    const [input, setInput] = useState('')
    const [submit, setSubmit] = useState('')
    const [pokeName, setPokeName] = useState('')
    const [pokeImage, setPokeImage] = useState('')
    const [pokeList, setPokeList] = useState([])
    const [currentPokemon, setCurrentPokemon] = useState(0)
    const [flag, setFlag] = useState(true)

    const showPreviousPokemon = () => {
        console.log('input ',input,'submit ',submit, 'pokename ',pokeName)
        if(currentPokemon <= 1) {
          return
        } else {
          setCurrentPokemon(currentPokemon-1)
          setSubmit(pokeList[currentPokemon -1])
          setFlag(false)
          handlePokeApi()
        }
       console.log(currentPokemon)
    }

    const showNextPokemon = () => {
        if(currentPokemon >= pokeList.length) {
          return
        } else {
          setCurrentPokemon(currentPokemon+1)
          setSubmit(pokeList[currentPokemon -1])
          setFlag(false)
          handlePokeApi()
        }
      console.log(currentPokemon)
    }

    const handleChange = (e) => {
        setInput(
          e.target.value
        )
      }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(input)
        setSubmit(input)
        console.log(submit)
        handlePokeApi()
    }

    function handlePokeApi() {
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
  
        console.log(pokeList.length, currentPokemon, pokeList)
    }

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
  