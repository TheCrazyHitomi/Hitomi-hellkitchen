import { recipesData } from "../../helpers/recipesData/recipesData";
import { useEffect, useState } from "react";

import RecipeCard from "../card/recipeCard";
import Filters from "../filters/filters";
import RecipeFile from "../recipeFile/recipeFile";
import "./recipesList.css"; // Assuming you have a CSS file for styling

const RecipesList = () => {

  // Initialize state to hold the filtered recipes
  const [filteredRecipes, setFilteredRecipes] = useState(recipesData);


  // Extract unique recipe types from recipesData
  const recipeTypes = recipesData.reduce(
          (acc, recipe) => 
                  acc.includes(recipe.recipeType) ? acc : acc.concat(recipe.recipeType),
              []
          )
          console.log(recipeTypes)

  const [selectedRecipeType, setSelectedRecipeType] = useState("");

  
  // Extract unique spice levels from recipesData
  const spiceLvls = recipesData.reduce(
    (acc, recipe) => 
      acc.includes(recipe.spiceLvl) ? acc : acc.concat(recipe.spiceLvl),
    []
  )
  console.log(spiceLvls)
  
  const [selectedSpiceLvl, setSelectedSpiceLvl] = useState("");

  // Extract unique ingredients from recipesData
  const ingredients = recipesData
  .flatMap(recipe => recipe.ingredients)
  .filter((ingredient, index, arr) => arr.indexOf(ingredient) === index);

console.log(ingredients);

  const [selectedIngredients, setSelectedIngredients] = useState("");
  
  useEffect(() => {

    const filtered = recipesData.filter(recipe => {
        const terms = selectedIngredients
          .split(" ") // ou .split(",") si tu préfères la virgule comme séparateur
          .map(term => term.trim().toLowerCase())
          .filter(Boolean); // enlève les vides

        const matchType = selectedRecipeType ? recipe.recipeType === selectedRecipeType : true;
        const matchSpice = selectedSpiceLvl ? recipe.spiceLvl === selectedSpiceLvl : true;

        const matchIngredientSearch = terms.length > 0
          ? terms.some(term =>
              recipe.ingredients.some(ingredients =>
                ingredients.toLowerCase().includes(term)
              )
            )
          : true;


    return matchType && matchSpice && matchIngredientSearch; // ✅ On vérifie les deux
  });

  setFilteredRecipes(filtered);
}, [selectedRecipeType, selectedSpiceLvl, selectedIngredients]);
  
  //   if (selectedRecipeType) {
  //     setFilteredRecipes(
  //       recipesData.filter(recipe => recipe.recipeType === selectedRecipeType)
  //     )
  //   } else if (selectedSpiceLvl) {
  //     setFilteredRecipes(
  //       recipesData.filter(recipe => recipe.spiceLvl === selectedSpiceLvl)
  //     )
  //   } else {
  //     setFilteredRecipes(recipesData);
  //   }
  // }, [selectedRecipeType, selectedSpiceLvl]);

  console.log(filteredRecipes);


  // useEffect(() => {
  //   if (selectedSpiceLvl) {
  //     setFilteredRecipes(
  //       recipesData.filter(recipe => recipe.spiceLvl === selectedSpiceLvl)
  //     );
  //   } else {
  //     setFilteredRecipes(recipesData);
  //   }
  // }
  // , [selectedSpiceLvl]);


  return (
    <>
    <div className="hero-list">
      <Filters 
      recipeTypes={recipeTypes} selectedRecipeType={selectedRecipeType} setSelectedRecipeType={setSelectedRecipeType} 
      spiceLvls={spiceLvls} selectedSpiceLvl={selectedSpiceLvl} setSelectedSpiceLvl={setSelectedSpiceLvl}
      ingredients={ingredients} selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients}/>
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
