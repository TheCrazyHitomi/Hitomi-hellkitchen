import { useState } from "react";
import { recipeList } from "../../helpers/recipes/recipesList";
import "./filter.css"; // Assuming you have a CSS file for styling
import FilterIngredient from "./filterIngredient/filterIngredient";
import FilterSpiceLevel from "./filterSpiceLvl/filterSpiceLvl";
import FilterType from "./filterType/filterType";


const Filters = () => {

    const [isOpen, setIsOpen] = useState(false);
    
    const recipeTypes = recipeList.reduce(
            (acc, recipe) => 
                    acc.includes(recipe.recipeType) ? acc : acc.concat(recipe.recipeType),
                []
            )
            console.log(recipeTypes)
    
    const [selectedRecipeType, setSelectedRecipeType] = useState("recipeType");

  return isOpen ? (
    <>
    <div className="overlay blur active"></div>
    <dialog className="secondary-container" open>
        <FilterType recipeTypes={recipeTypes} selectedRecipeType={selectedRecipeType} setSelectedRecipeType={setSelectedRecipeType}/>
        <FilterSpiceLevel />
        <FilterIngredient />
        <button className="close-button" onClick={() => setIsOpen(false)}>Fermer</button>
    </dialog>
    </>
    // <div>
    //     <div class="overlay blur"></div>
    //     <dialog>
    //         <FilterType />
    //         <FilterSpiceLevel />
    //         <FilterIngredient />
    //         <button onClick={() => setIsOpen(false)}>Fermer</button>
    //     </dialog>
    // </div>
  ) : (
  <button onClick={() => setIsOpen(true)}>Filtres</button>
  )
}

export default Filters;
