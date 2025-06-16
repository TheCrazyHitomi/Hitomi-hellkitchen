import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/home/App'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Recipes from './pages/recipes/recipes'
import Starters from './pages/starters/starters'
import Plats from './pages/plats/plats'
import Desserts from './pages/desserts/desserts'
import NewRecipe from './pages/newRecipe/newRecipe'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/recettes" element={<Recipes />} />
          <Route path="/entrees" element={<Starters />} />
          <Route path="/plats" element={<Plats />} />
          <Route path="/desserts" element={<Desserts />} />
          <Route path="/nouvelle-recette" element={<NewRecipe />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
