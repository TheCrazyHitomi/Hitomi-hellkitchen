import React from "react";
import Header from "../../components/header/header";
import RecipesList from "../../components/recipesList/recipesList";
import "./recipes.css"; // Assuming you have a CSS file for styling

const Recipes = () => {
  return (
    <>
    <Header />
    <div className="hero">
      <h1>Mes recettes</h1>
      <RecipesList />
    </div>
    </>
  );
}

export default Recipes;
