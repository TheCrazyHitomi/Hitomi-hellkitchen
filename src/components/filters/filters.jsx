import { useState } from "react";
import "./filter.css"; // Assuming you have a CSS file for styling
import FilterIngredient from "./filterIngredient/filterIngredient";
import FilterSpiceLevel from "./filterSpiceLvl/filterSpiceLvl";
import FilterType from "./filterType/filterType";


const Filters = ({recipeTypes, selectedRecipeType, setSelectedRecipeType, spiceLvls, selectedSpiceLvl, setSelectedSpiceLvl}) => {

    const [isOpen, setIsOpen] = useState(false);
    

  return isOpen ? (
    <>
    <div className="overlay blur active"></div>
    <dialog className="secondary-container" open>
        <FilterType recipeTypes={recipeTypes} selectedRecipeType={selectedRecipeType} setSelectedRecipeType={setSelectedRecipeType}/>
        <FilterSpiceLevel spiceLvls={spiceLvls} selectedSpiceLvl={selectedSpiceLvl} setSelectedSpiceLvl={setSelectedSpiceLvl}/>
        <FilterIngredient />
        <button className="close-button" onClick={() => setIsOpen(false)}>Fermer</button>
    </dialog>
    </>
  ) : (
  <button onClick={() => setIsOpen(true)}>Filtres</button>
  )
}

export default Filters;
