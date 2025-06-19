import { recipesData } from "../../helpers/recipesData/recipesData";
import React, { useEffect, useState } from "react";

import RecipeCard from "../card/recipeCard";
import Filters from "../filters/filters";
import RecipeFile from "../recipeFile/recipeFile";
import "./recipesList.css"; // Assuming you have a CSS file for styling

const RecipesList = () => {

const recipeTypes = recipesData.reduce(
        (acc, recipe) => 
                acc.includes(recipe.recipeType) ? acc : acc.concat(recipe.recipeType),
            []
        )
        console.log(recipeTypes)

const [selectedRecipeType, setSelectedRecipeType] = useState("");
const [filteredRecipes, setFilteredRecipes] = useState(recipesData);

useEffect(() => {
  if (selectedRecipeType) {
    setFilteredRecipes(
      recipesData.filter(recipe => recipe.recipeType === selectedRecipeType)
    );
  } else {
    setFilteredRecipes(recipesData);
  }
}, [selectedRecipeType]);

  return (
    <>
    <div className="hero-list">
      <Filters recipeTypes={recipeTypes} selectedRecipeType={selectedRecipeType} setSelectedRecipeType={setSelectedRecipeType} />

        <ul className="recipes-list">
      {filteredRecipes.map(recipe => (
        <RecipeCard key={recipe.id} {...recipe} />
      ))}
        </ul>
    </div>
    <RecipeFile recipe={recipesData[0]} />
  </>
  );
}

export default RecipesList;
