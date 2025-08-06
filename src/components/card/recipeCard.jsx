import React from "react";

import "./recipeCard.css"; // Assuming you have a CSS file for styling
import SpiceLvlScale from "./spiceLvl/spiceLvl";


const RecipeCard = ({ id, image, recipeName, recipeType, spiceLvlId }) => {
  console.log(`Rendering RecipeCard for: ${recipeType} ${recipeName}, Spice Level: ${spiceLvlId}`);
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
