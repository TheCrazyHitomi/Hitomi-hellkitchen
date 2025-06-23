const FilterSpiceLevel = ({spiceLvls, selectedSpiceLvl, setSelectedSpiceLvl}) => {
  return (
    <>
      <legend htmlFor="spiceLvl">Niveau d'épice :</legend>
            <div className="field suffix border round tertiary-container">
              <select name="recipeType" value={selectedSpiceLvl} onChange={(e) => setSelectedSpiceLvl(e.target.value)}>
          <option value="">--</option>
                    {spiceLvls.map((spiceLvl) => (
                        <option key={spiceLvl}>{spiceLvl}</option>
                    ))}
        </select>
              <i>arrow_drop_down</i>
            </div>
    </>
  );
}

export default FilterSpiceLevel;
