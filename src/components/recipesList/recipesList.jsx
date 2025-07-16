
import { useEffect, useState } from "react";

import RecipeCard from "../card/recipeCard";
import Filters from "../filters/filters";
import "./recipesList.css"; // Assuming you have a CSS file for styling
import { Link } from "react-router-dom";
import axios from "axios";

const RecipesList = () => {

  
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes); // Initialize with all recipes
  
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


  // Extract unique recipe types from recipes
  const recipeTypes = recipes.reduce(
          (acc, recipe) => acc.includes(recipe.recipeType) ? acc : acc.concat(recipe.recipeType),
              []
          )

  const [selectedRecipeType, setSelectedRecipeType] = useState("");

  
  // Extract unique spice levels from recipesData
  const spiceLvls = recipes.reduce(
    (acc, recipe) => 
      acc.includes(recipe.spiceLvl) ? acc : acc.concat(recipe.spiceLvl),
    []
  )
  
  const [selectedSpiceLvl, setSelectedSpiceLvl] = useState("");

  // Extract unique ingredients from recipesData
  const ingredients = recipes
  .flatMap(recipe => recipe.ingredients)
  .filter((ingredient, index, arr) => arr.indexOf(ingredient) === index);


  const [selectedIngredients, setSelectedIngredients] = useState("");
  
  useEffect(() => {

    const filtered = recipes.filter(recipe => {
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
}, [recipes, selectedIngredients, selectedRecipeType, selectedSpiceLvl]);
  
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

    <div className="hero-list">
      <Filters
        recipeTypes={recipeTypes} selectedRecipeType={selectedRecipeType} setSelectedRecipeType={setSelectedRecipeType}
        spiceLvls={spiceLvls} selectedSpiceLvl={selectedSpiceLvl} setSelectedSpiceLvl={setSelectedSpiceLvl}
        ingredients={ingredients} selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients} />
      
      <ul className="recipes-list">
        {filteredRecipes.map(recipe => (
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

export default RecipesList;
