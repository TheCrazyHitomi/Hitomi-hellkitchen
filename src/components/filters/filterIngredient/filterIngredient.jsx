const FilterIngredient = ({selectedIngredients, setSelectedIngredients}) => {

  return (
    <>
      <div className="max">
        <legend htmlFor="recipeType">choisir par ingrédient :</legend>
              <div className="field label max border round">
                <input value={selectedIngredients} onChange={(e) => setSelectedIngredients(e.target.value)}/>
                <label>Ingrédient</label>
              </div>
            </div>
    </>
  );
}

export default FilterIngredient;
