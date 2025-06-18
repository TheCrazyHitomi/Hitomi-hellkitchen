const RecipeFile = ({ recipe }) => {
  return (
    <div className="recipe-file">
      <h2>{recipe.recipeName}</h2>
      <img src={recipe.image} alt={recipe.recipeName} />
      <p>{recipe.description}</p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
}

export default RecipeFile;