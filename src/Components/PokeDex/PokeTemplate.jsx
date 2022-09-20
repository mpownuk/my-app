export const PokeTemplate =({name, image, className, onClick}) => {
    return (
      <div className="flexBox flexColumn"> 
        <h1>{name}</h1>
        <div className={className} >
          <img onClick={onClick} src={image} alt=" "></img>
        </div>
      </div>
  
    )
  }
