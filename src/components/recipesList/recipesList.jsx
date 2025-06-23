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
  
  useEffect(() => {

    const filtered = recipesData.filter(recipe => {
    const matchType = selectedRecipeType ? recipe.recipeType === selectedRecipeType : true;
    const matchSpice = selectedSpiceLvl ? recipe.spiceLvl === selectedSpiceLvl : true;

    return matchType && matchSpice; // ✅ On vérifie les deux
  });

  setFilteredRecipes(filtered);
}, [selectedRecipeType, selectedSpiceLvl]);
  
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
      spiceLvls={spiceLvls} selectedSpiceLvl={selectedSpiceLvl} setSelectedSpiceLvl={setSelectedSpiceLvl}/>
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
