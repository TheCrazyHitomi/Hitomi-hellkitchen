import React from "react";
import { useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/header";
import "beercss"
import "./newRecipe.css";


const NewRecipe = () => {
  // Fonction pour gérer la soumission du formulaire
  const [recipeName, setRecipeName] = React.useState("");
  const [recipeType, setRecipeType] = React.useState("category");
  const [spiceLvl, setSpiceLvl] = React.useState("category"); 
  const [previewImage, setPreviewImage] = React.useState("src/assets/images/HHK-logo.png");
  const [imageFile, setImageFile] = React.useState(null);

  const [ingredients, setIngredients] = React.useState([
    { quantity: "", unit: "pce", ingredient: "" } 
  ]);
  const [instructions, setInstructions] = React.useState([ { step: "", text: "" } ]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
  return () => {
    if (previewImage.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }
  };
}, [previewImage]);

  const uploadImageToCloudinary = async () => {
    if (!imageFile) {
      console.error("Aucun fichier image sélectionné.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "your_upload_preset"); // Remplacez par votre propre preset

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dwtspfxgz/image/upload", 
        { method: "POST", 
          body: formData }
        );
      return response.data.secure_url;
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image :", error);
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { quantity: "", unit: "pce", ingredient: "" }]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleStepInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index].step = value;
    setInstructions(newInstructions);
  };
  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, { step: "", text: "" }]);
  };

  const handleRemoveInstruction = (index) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(newInstructions);
  };  

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    let imageUrl = "";
    // Vérifier si une image a été sélectionnée et l'uploader
    if (imageFile) {
      imageUrl = await uploadImageToCloudinary();
    } 

    const formattedIngredients = ingredients.map(ing => `${ing.quantity} ${ing.unit} ${ing.ingredient}`).join(", ");  

    const getSpiceLevelId = (spiceLvl) => {
      switch (spiceLvl) {
        case "lowSpice":
          return "1";
        case "mediumSpice":
          return "2";
        case "highSpice":
          return "3";
        case "dieSpice":
          return "4";
        default:
          return null;
      }
    };

const spiceLvlId = getSpiceLevelId(spiceLvl);

    const newRecipe = {
      name: recipeName,
      type: recipeType,
      spiceLevel: spiceLvl,
      spiceLvlId: spiceLvlId, // Assurez-vous que c'est le bon format pour votre API
      image: imageUrl || previewImage, // Utiliser l'URL de l'image upload
      ingredients : formattedIngredients,
      instructions: instructions.map((text, i) => ([{
          step: `Étape ${i + 1}`,
          text
  }]))
    };

    console.log("Nouvelle recette :", newRecipe);

    try {
      const response = await axios.post("http://localhost:3000/api/recipes", 
        { method: "POST", 
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify(newRecipe) }
      ); 
      const result = await response.json();
      alert("Recette ajoutée avec succès !");
      console.log("Réponse du serveur :", result);
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout de la recette :", error);
      alert("Erreur lors de l'ajout de la recette. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <Header />
      <h3>Créer une nouvelle recette</h3>
      <div className="form-container">
      {/* Formulaire pour ajouter une nouvelle recette */}
      <form onSubmit={handleSubmit}>

        <div className="row select-container"> 
          {/* selecteur type de plat */}
          <div>
            <legend htmlFor="recipeType">Type de plat :</legend>
            <div className="field suffix border round fill">
              <select name="recipeType" defaultValue="category" value={recipeType} onChange={(e) => setRecipeType(e.target.value)}>
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
              <select name="spiceLvl" defaultValue="category" value={spiceLvl} onChange={(e) => setSpiceLvl(e.target.value)}>
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
          <img className="top-round left-round medium" src={previewImage} alt="Aperçu de l'image" />
          <button className="circle">
            <i>image</i>
            <input type="file" onChange={handleImageChange} accept="image/*" />
          </button>
        </div>


        {/* input nom de la recette */}
        <legend>Nom de la recette : </legend>
        <div className="field label max border round fill">
          <input type="text" id="recipeName" name="recipeName" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} required />
          <label>Nom de la recette</label>
        </div>

        
        {/* input ingrédients */}
        <fieldset className="fieldset">
          <legend>Les ingrédients</legend>
          {ingredients.map((ing, i) => (
            <div className="row" key={i}>
              <div className="max">
                <div className="field label max border round fill">
                  <input value={ing.quantity} onChange={(e) => handleIngredientChange(i, 'quantity', e.target.value)} />
                  <label>Quantité</label>
                </div>
              </div>
            <div className="max">
              <div className="field label max border round fill">
                <select value={ing.unit} onChange={(e) => handleIngredientChange(i, 'unit', e.target.value)}>
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
                <input value={ing.ingredient} onChange={(e) => handleIngredientChange(i, 'ingredient', e.target.value)} />
                <label>Ingrédient</label>
              </div>
            </div>
              <button type="button" onClick={() => handleRemoveIngredient(i)}><i>close</i></button>
          </div>
          ))}
          <div className="add-button">
            <button className="extend circle right-round bottom-round small-elevate primary" type="button" onClick={handleAddIngredient}>
              <i>add</i>
              <span >ajouter un ingrédient</span>
            </button>
          </div>
        </fieldset>

        {/* input instructions */}
        <fieldset className="fieldset">
          <legend>Les instructions</legend>
          {instructions.map((step, i) => (
            <div className="column fieldset" key={i}>
              <div className="max">
                <div className="row">
                <div className="field label max border round fill">
                  <input 
                  value={step.step}
                  onChange={(e) => handleStepInstructionChange(i, e.target.value)}
                  />
                  <label>{`Étape ${i + 1}`}</label>
                  </div>
                  <button type="button" onClick={() => handleRemoveInstruction(i)}><i>close</i></button>
                </div>
              </div>
              <div className="max">
                <div className="field textarea label border round fill extra">
                  <textarea value={step.text} onChange={(e) => handleInstructionChange(i, e.target.value)}></textarea>
                  <label>Instructions</label>
                </div>
              </div>

          </div>
          ))}
          <div className="add-button">
            <button className="extend circle right-round bottom-round small-elevate primary" type="button" onClick={handleAddInstruction}>
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
