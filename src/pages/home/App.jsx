
import React from 'react'
import './App.css'

function App() {

  const handleClick = () => {
    // Handle button click
    window.location.href = '/recettes';
  }

  return (
    <>
      <div className='home-container'>
          <img src="src/assets/images/HHK-logo.png" className="logo" alt="Hitomi's Hell Kitchen logo" onClick={handleClick} />
      </div>
      <h1>Bienvenue dans ma cuisine</h1>
      <div className="card">

        <p>petit texte d'introduction a générer plus tard... </p>
        <button onClick={handleClick} className="button">
          Enter the Hell Kitchen
        </button>
      </div>
    </>
  )
}

export default App
