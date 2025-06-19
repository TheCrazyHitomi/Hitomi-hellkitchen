import React from "react";

import "./recipeCard.css"; // Assuming you have a CSS file for styling
import SpiceLvlScale from "./spiceLvl/spiceLvl";

function handleClick(recipeName) {
  console.log(`Recipe clicked: ${recipeName}`); // This can be replaced with navigation logic if needed
  //window.location.href = `(lien de la fiche recette)`;
  alert(`You clicked on ${recipeName}`); // Placeholder for actual navigation
}


const RecipeCard = ({ id, image, recipeName, spiceLvl }) => {
  console.log(`Rendering RecipeCard for: ${recipeName}, Spice Level: ${spiceLvl}`);
  return (
        <li className="recipe-card" key={id} onClick={() => handleClick(recipeName)}>
          <article className="small-blur">
          <img  src={image} alt={recipeName} />
          <h6 className="link small">{recipeName}</h6>
            <SpiceLvlScale className="spice-lvl" spiceLvlValue={spiceLvl} />
          </article>
        </li>
      )
}

export default RecipeCard;
