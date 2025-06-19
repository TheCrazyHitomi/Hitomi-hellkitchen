const FilterSpiceLevel = () => {
  return (
    <>
      <legend htmlFor="spiceLvl">Niveau d'épice :</legend>
            <div className="field suffix border round tertiary-container">
              <select name="spiceLvl" defaultValue="category">
                <option value="category">Catégorie</option>
                <option value="lowSpice">légèrement épicé 🌶️</option>
                <option value="mediumSpice">Modérément épicé 🌶️🌶️</option>
                <option value="highSpice">Très épicé 🌶️🌶️🌶️</option>
                <option value="dieSpice">Mortellement épicé 🌶️🌶️🌶️🌶️</option>
              </select>
              <i>arrow_drop_down</i>
            </div>
    </>
  );
}

export default FilterSpiceLevel;
