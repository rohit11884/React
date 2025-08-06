import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [counter, setCounter] = useState(5);

  // let counter=5;
  function addValue() {
    if(counter<20){
      counter += 1;
      setCounter(counter)
      console.log("Value added :", counter);
    }
  }
  function removeValue() {
    if (counter > 0) {
      counter -= 1;
      setCounter(counter)
      console.log("Value added :", counter);
    }

  }

  return (
    <>
      <h1>Hooks</h1>
      <h2>Counter value : {counter}</h2>

      <button
        onClick={addValue}
      >Add value</button>
      <br />
      <button
        onClick={removeValue}
      >Decrease value</button>
    </>
  )
}

export default App
