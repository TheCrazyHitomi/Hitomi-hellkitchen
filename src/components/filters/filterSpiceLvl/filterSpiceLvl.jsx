const FilterSpiceLevel = ({ selectedSpiceLvl, setSelectedSpiceLvl}) => {
  return (
    <>
      <legend htmlFor="spiceLvl">Niveau d'épice :</legend>
            <div className="field suffix border round tertiary-container">
              <select name="recipeType" value={selectedSpiceLvl} onChange={(e) => setSelectedSpiceLvl(e.target.value)}>
                <option value="">Catégorie</option>
                <option value="légèrement épicé 🌶️">légèrement épicé 🌶️</option>
                <option value="Modérément épicé 🌶️🌶️">Modérément épicé 🌶️🌶️</option>
                <option value="Très épicé 🌶️🌶️🌶️">Très épicé 🌶️🌶️🌶️</option>
                <option value="Mortellement épicé 🌶️🌶️🌶️🌶️">Mortellement épicé 🌶️🌶️🌶️🌶️</option>
        </select>
              <i>arrow_drop_down</i>
            </div>
    </>
  );
}

export default FilterSpiceLevel;
