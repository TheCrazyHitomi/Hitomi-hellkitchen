import { useState } from "react";
import Icon from "@mdi/react";
import { mdiRotateLeft } from '@mdi/js';
import "./filter.css"; // Assuming you have a CSS file for styling
import FilterIngredient from "./filterIngredient/filterIngredient";
import FilterSpiceLevel from "./filterSpiceLvl/filterSpiceLvl";
import FilterType from "./filterType/filterType";


const Filters = ({recipeTypes, selectedRecipeType, setSelectedRecipeType, spiceLvls, selectedSpiceLvl, setSelectedSpiceLvl, ingredients, selectedIngredients, setSelectedIngredients}) => {

    const [isOpen, setIsOpen] = useState(false);
    

  return isOpen ? (
    <>
    <div className="overlay blur active"></div>
    <dialog className="secondary-container" open>
        <FilterType recipeTypes={recipeTypes} selectedRecipeType={selectedRecipeType} setSelectedRecipeType={setSelectedRecipeType}/>
        <FilterSpiceLevel spiceLvls={spiceLvls} selectedSpiceLvl={selectedSpiceLvl} setSelectedSpiceLvl={setSelectedSpiceLvl}/>
        <FilterIngredient ingredients={ingredients} selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients} />
        <button className="close-button" onClick={() => setIsOpen(false)}>Fermer</button>
        <button className="close-button secondary" onClick={() =>{
                                                    setSelectedRecipeType("");
                                                    setSelectedSpiceLvl("");
                                                    setSelectedIngredients("")}}><Icon className="inverse-primary-text" path={mdiRotateLeft}
                                                                                          title="User Profile"
                                                                                          size={1}
                                                                                          horizontal
                                                                                          vertical
                                                                                          rotate={90}
                                                                                          spin/>Réinitialiser</button>
    </dialog>
    </>
  ) : (
  <button onClick={() => setIsOpen(true)}>Filtres</button>
  )
}

export default Filters;
