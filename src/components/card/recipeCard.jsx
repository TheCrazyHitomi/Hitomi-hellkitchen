import React from "react";

import "./recipeCard.css"; // Assuming you have a CSS file for styling

function handleClick(recipeName) {
  console.log(`Recipe clicked: ${recipeName}`); // This can be replaced with navigation logic if needed
  //window.location.href = `(lien de la fiche recette)`;
  alert(`You clicked on ${recipeName}`); // Placeholder for actual navigation
}

const RecipeCard = ({ id, image, recipeName }) => {
  return (
        <li className="recipe-card" key={id} onClick={() => handleClick(recipeName)}>
          <img src={image} alt={recipeName} />
          <h6 className="link">{recipeName}</h6>
        </li>
      )
}

export default RecipeCard;
