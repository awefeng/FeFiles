import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import C from './C'

export const XContext = React.createContext({name: '2'})
XContext.displayName = 'XContext'
function App() {
  const [xx, setXX] = useState({name: '2'})
  return (
    <div className="App">
      <XContext.Provider value={xx}>
      <header className="App-header">
        <div></div><C />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={()=>{setXX({name: 'xxx'})}}>changer</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      </XContext.Provider>
    </div>
  );
}

export default App;
