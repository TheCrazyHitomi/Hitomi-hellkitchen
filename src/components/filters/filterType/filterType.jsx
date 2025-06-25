const FilterType = ({ selectedRecipeType, setSelectedRecipeType }) => {


  return (
    <>
      <legend htmlFor="recipeType">Type de plat :</legend>
      <div className="field suffix border round ">
        <select name="recipeType" value={selectedRecipeType} onChange={(e) => setSelectedRecipeType(e.target.value)}>
          <option value="">Catégorie</option>
          <option value="entrée">Entrée</option>
          <option value="plat principal">Plat principal</option>
          <option value="dessert">Dessert</option>
        </select>
        <i>arrow_drop_down</i>
      </div>
    </>
  );
}

export default FilterType;
