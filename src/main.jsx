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
import Footer from './components/footer/footer'
import RecipeFile from './components/recipeFile/recipeFile'
import EditRecipe from './pages/editRecipe/editrecipe'

import Connexion from './pages/connexion/connexion'
import Inscription from './pages/inscription/inscription'


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
          <Route path="/recettes/:slug/edit" element={<EditRecipe />} />
          <Route path="/recettes/:slug" element={<RecipeFile />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  </StrictMode>,
)
