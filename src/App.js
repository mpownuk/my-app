import React from "react";
import './index.css'
import Nav from './Nav.js'
import Main from './Main.js'

class App extends React.Component {
    render() {
        return (
         <div> 
            <Nav />
            <Main />
         </div>
        )
    }
}

export default App