import React from "react";

import "./recipeCard.css"; // Assuming you have a CSS file for styling
import SpiceLvlScale from "./spiceLvl/spiceLvl";

// function handleClick(recipeName) {
//   console.log(`Recipe clicked: ${recipeName}`); // This can be replaced with navigation logic if needed
//   //window.location.href = `(lien de la fiche recette)`;
//   alert(`You clicked on ${recipeName}`); // Placeholder for actual navigation
// }


const RecipeCard = ({ id, image, recipeName, spiceLvlId }) => {
  console.log(`Rendering RecipeCard for: ${recipeName}, Spice Level: ${spiceLvlId}`);
  return (
        <div className="recipe-card" key={id} >
          <article className="small-blur">
          <img  src={image} alt={recipeName} />
          <h6 className="link bold small">{recipeName}</h6>
            <SpiceLvlScale className="spice-lvl" spiceLvlValue={spiceLvlId} />
          </article>
        </div>
      )
}

export default RecipeCard;
