import "./recipeFile.css";
import { useParams } from "react-router-dom";
import recipesData from "../../helpers/recipesData/recipesData"; // Assuming you have a JSON file with recipe data
import Header from "../header/header";

const RecipeFile = () => {
  const { slug } = useParams();
  const recipe = recipesData.find(r => r.slug === slug);

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