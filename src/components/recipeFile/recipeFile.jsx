import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import Header from "../header/header";
import "./recipeFile.css";

const RecipeFile = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const recipe = recipes.find(r => r.slug === slug); // Assuming each recipe has a 'slug' property

  useEffect(() => {
    axios.get("http://localhost:3000/api/recipes") // Replace with your API endpoint
      .then(response => {
        setRecipes(response.data); // Assuming the response data is an array of recipes
      })
      .catch(error => {
        console.error("Erreur de chargeement des recettes.", error);
      });
  }, []);

  if (!recipe) {
    return <p>Recipe not found</p>;
  }
  console.log("Recipe details:", recipe);

  // Handle recipe deletion
  const handleDelete = () => {
    axios.delete(`http://localhost:3000/api/recipes/${recipe._id}`)
      .then(response => {
        console.log("Recipe deleted successfully", response.data);
        alert("Recette supprimée avec succès !");
        navigate("/recettes");
      })
      .catch(error => {
        console.error("Error deleting recipe:", error);
      });
  };

  return (
    <>
      <Header />
      <div className="recipe-file-container">
        <div className="edit-recipe-buttons">
          <Link to={`/recettes/${recipe.slug}/edit`} state={{ id: recipe._id }}>Modifier </Link>
        <button className="error small-elevate" onClick={handleDelete}>supprimer</button>
      </div>
      <article className=" small-blur recipe-file">
        <h2 className="link">{recipe.recipeName}</h2>
        <div className="recipe-file-info">
          <article className="round tertiary-container recipe-file-details">
            <h3 className="link">Ingrédients:</h3>
            <ul>
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{`${ing.quantity} ${ing.unit} ${ing.ingredient}`}</li>
              ))}
            </ul>
          </article>
          <img className="recipe-file-image" src={recipe.image} alt={recipe.recipeName} />
        </div>
        <h3 className="link">Instructions:</h3>
        <ul>
          {recipe.instructions.map((inst, s, t) => (
        <ul>
            <li key={s}>{`${inst.step} :`}</li>
            <li key={t}>{inst.text}</li>
        </ul>
          ))}
        </ul>
      </article>
      
      </div>
    </>
  );
}

export default RecipeFile;