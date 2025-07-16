import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Header from "../header/header";
import "./recipeFile.css";

const RecipeFile = () => {
  const { slug } = useParams();
  const [recipes, setRecipes] = useState([]);
  const recipe = recipes.find(r => r.slug === slug); // Assuming each recipe has a 'slug' property

  useEffect(() => {
    axios.get("http://localhost:3000/api/recipes") // Replace with your API endpoint
      .then(response => {
        console.log(response.data);
        setRecipes(response.data); // Assuming the response data is an array of recipes
      })
      .catch(error => {
        console.error("Erreur de chargeement des recettes.", error);
      });
  }, []);

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <>
      <Header />
      <div className="recipe-file-container">
      <article className=" small-blur recipe-file">
        <h2 className="link">{recipe.recipeName}</h2>
        <div className="recipe-file-info">
          <article className="round tertiary-container recipe-file-details">
            <h3 className="link">Ingrédients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </article>
          <img className="recipe-file-image" src={recipe.image} alt={recipe.recipeName} />
        </div>
        <h3 className="link">Instructions:</h3>
        <p>{recipe.instructions}</p>
      </article>
      </div>
    </>
  );
}

export default RecipeFile;