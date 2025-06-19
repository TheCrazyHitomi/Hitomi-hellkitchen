import { recipeList } from "../../helpers/recipes/recipesList";
import React, { useState } from "react";

import RecipeCard from "../card/recipeCard";
import Filters from "../filters/filters";
import RecipeFile from "../recipeFile/recipeFile";
import "./recipesList.css"; // Assuming you have a CSS file for styling

const RecipesList = () => {

const recipeTypes = recipeList.reduce(
        (acc, recipe) => 
                acc.includes(recipe.category) ? acc : acc.concat(recipe.category),
            []
        )
        console.log(recipeTypes)

const [selectedRecipeType, setSelectedRecipeType] = useState("recipeType");

  return (
    <>
    <div className="hero-list">
      <Filters recipeTypes={recipeTypes} selectedRecipeType={selectedRecipeType} setSelectedRecipeType={setSelectedRecipeType} />

        <ul className="recipes-list">
      {recipeList.map(recipe => (
        !selectedRecipeType || recipe.category === selectedRecipeType ? (
          <RecipeCard key={recipe.id} {...recipe} />
        ) : null
      ))}
        </ul>
    </div>
    <RecipeFile recipe={recipeList[0]} />
  </>
  );
}

export default RecipesList;
