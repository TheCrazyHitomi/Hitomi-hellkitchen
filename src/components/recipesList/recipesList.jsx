import { recipeList } from "../../helpers/recipes/recipesList";
import RecipeCard from "../card/recipeCard";
import "./recipesList.css"; // Assuming you have a CSS file for styling

const RecipesList = () => {
  return (
    <div className="hero-list">
        <ul className="recipes-list">
      {recipeList.map(recipe => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
        </ul>
    </div>
  );
}

export default RecipesList;
