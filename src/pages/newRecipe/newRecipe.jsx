import React from "react";
import Header from "../../components/header/header";
import "beercss"
import "./newRecipe.css";


const NewRecipe = () => {
  return (
    <div>
      <Header />
      <h3>Créer une nouvelle recette</h3>
      <div className="form-container">
      {/* Formulaire pour ajouter une nouvelle recette */}
      <form>

{/*  */}
{/*  */}
        <div className="row select-container"> 
          {/* selecteur type de plat */}
          <div>
            <legend htmlFor="recipeType">Type de plat :</legend>
            <div className="field suffix border round fill">
              <select name="recipeType" defaultValue="category">
                <option value="category">Catégorie</option>
                <option value="starter">Entrée</option>
                <option value="main">Plat principal</option>
                <option value="dessert">Dessert</option>
              </select>
              <i>arrow_drop_down</i>
            </div>
          </div>
          {/* selecteur niveau d'épice */}
          <div>
            <legend htmlFor="spiceLvl">Niveau d'épice :</legend>
            <div className="field suffix border round fill">
              <select name="spiceLvl" defaultValue="category">
                <option value="category">Catégorie</option>
                <option value="lowSpice">légèrement épicé 🌶️</option>
                <option value="mediumSpice">Modérément épicé 🌶️🌶️</option>
                <option value="highSpice">Très épicé 🌶️🌶️🌶️</option>
                <option value="dieSpice">Mortellement épicé 🌶️🌶️🌶️🌶️</option>
              </select>
              <i>arrow_drop_down</i>
              <span className="helper">facultatif</span>
            </div>
          </div>
          {/* bouton d'ajout d'image */}
          <img className="top-round left-round medium" src="src/assets/images/HHK-logo.png" alt="Ajouter une image" />
          <button className="circle">
            <i>image</i>
            <input type="file" />
          </button>
        </div>


        {/* input nom de la recette */}
        <legend>Nom de la recette : </legend>
        <div className="field label max border round fill">
          <input type="text" id="recipeName" name="recipeName" required />
          <label>Nom de la recette</label>
        </div>
{/*  */}
{/*  */}
        {/* input ingrédients */}
        <fieldset className="fieldset">
          <legend>Les ingrédients</legend>
            <div className="row">
              <div className="max">
                <div className="field label max border round fill">
                  <input />
                  <label>Quantité</label>
                </div>
              </div>
            <div className="max">
              <div className="field label max border round fill">
                <select>
                  <option>pce</option>
                  <option>g</option>
                  <option>kg</option>
                  <option>ml</option>
                  <option>cl</option>
                  <option>l</option>
                  <option>c.c.</option>
                  <option>c.s.</option>
                </select>
                <label>Type de mesure</label>
              </div>
            </div>
            <div className="max">
              <div className="field label max border round fill">
                <input />
                <label>Ingrédient</label>
              </div>
            </div>
          </div>
          <div className="add-button">
            <button className="extend circle right-round bottom-round small-elevate primary" type="button">
              <i>add</i>
              <span >ajouter un ingrédient</span>
            </button>
          </div>
        </fieldset>
{/*  */}
{/*  */}
          {/* input instructions */}
          <fieldset className="fieldset">
          <legend>Les instructions</legend>
            <div className="column fieldset">
              <div className="max">
                <div className="field label max border round fill">
                  <input />
                  <label>Étape</label>
                </div>
              </div>
              <div className="max">
                <div className="field textarea label border round fill extra">
                  <textarea></textarea>
                  <label>Instructions</label>
                </div>
              </div>
          </div>
          <div className="add-button">
            <button className="extend circle right-round bottom-round small-elevate primary" type="button">
              <i>add</i>
              <span >ajouter une instruction</span>
            </button>
          </div>
        </fieldset>

        {/* bouton d'ajout de la recette */}
        <div>
          <button className="submit-button" type="submit">Ajouter</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default NewRecipe;
