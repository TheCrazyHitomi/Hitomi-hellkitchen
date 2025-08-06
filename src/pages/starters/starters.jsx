import React from "react";
import Header from "../../components/header/header";
import RecipesList from "../../components/recipesList/recipesList";

const Starters = () => {
  return (
    <div>
        <Header />
      <h1>Mes entrées</h1>
      <RecipesList recipeType="starter" />
    </div>
  );
}

export default Starters;
