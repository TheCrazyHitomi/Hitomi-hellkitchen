import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header/header";
import RecipeCard from "../../components/card/recipeCard";// Assuming you have a local JSON file with recipes

const Main = () => {
  const [recipes, setRecipes] = useState([]);

    useEffect(() => {
    axios.get("http://localhost:3000/api/recipes") // Replace with your API endpoint
      .then(response => {
         console.log("🧪 Recettes reçues :");
         response.data.forEach(recipe => console.log(recipe.recipeType));
        setRecipes(response.data.filter(recipe => recipe.recipeType && recipe.recipeType.trim().toLowerCase() === "main")); // Assuming the response data is an array of recipes
      })
      .catch(error => {
        console.error("Erreur de chargeement des recettes.", error);
      });
  }, []);


  return (
    <div>
        <Header />
        <h1>Mes plats</h1>
        <p>Découvrez nos recettes de plats savoureux et faciles à préparer.</p>
        <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <Link  to={`/recettes/${recipe.slug}`}>
              <RecipeCard {...recipe} />
            </Link>
          </li>
        ))}
        </ul>
    </div>
  );
}

export default Main;
