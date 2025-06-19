import "./recipeFile.css";

const RecipeFile = ({ recipe }) => {
  return (
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
  );
}

export default RecipeFile;