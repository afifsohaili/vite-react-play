import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

    return (
        <form className="App">
            <input name='firstName' type='text'/>
            <input name='lastName' type='text'/>
            <input name='email' type='text'/>
            <input name='password' type='password'/>

            <button type='submit'>Sign up</button>
        </form>
    )
}

export default App
