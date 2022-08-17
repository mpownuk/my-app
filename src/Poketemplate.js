const PokeTemplate =(props) => {
    return (
      <div className="flexBox flexColumn"> 
        <h1>{props.name}</h1>
        <div className="circle" >
          <img src={props.image} alt=" "></img>
        </div>
      </div>
  
    )
  }

  PokeTemplate.defaultProps = {
    name: 'Enter Name of Pokemon!'
  }

  export default PokeTemplate