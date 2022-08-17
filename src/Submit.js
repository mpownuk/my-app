const PokeSubmit = (props) => {
    return (
      <button type='submit' onSubmit={props.onSubmit} disabled={props.input === '' ? true : false} >Search!</button>
    )
  }

export default PokeSubmit