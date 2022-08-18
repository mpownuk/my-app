const PokeTemplate =({image,name="Unknown"}) => {
    return (
      <div className="flexBox flexColumn"> 
        <h1>{name}</h1>
        <div className="circle" >
          <img src={image} alt=" "></img>
        </div>
      </div>
  
    )
  }

  export default PokeTemplate