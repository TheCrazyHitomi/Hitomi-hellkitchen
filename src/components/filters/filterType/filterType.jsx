const FilterType = ({recipeTypes, selectedRecipeType, setSelectedRecipeType }) => {


  return (
    <>
      <legend htmlFor="recipeType">Type de plat :</legend>
      <div className="field suffix border round ">
        <select name="recipeType" value={selectedRecipeType} onChange={(e) => setSelectedRecipeType(e.target.value)}>
          <option value="">--</option>
                    {recipeTypes.map((recipeType) => (
                        <option key={recipeType}>{recipeType}</option>
                    ))}
        </select>
        <i>arrow_drop_down</i>
      </div>
      <button onClick={() => setSelectedRecipeType("")}>Réinitialiser</button>
    </>
  );
}

export default FilterType;
