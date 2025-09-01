import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../helpers/api";
import ErrorToast from "../../components/errorToast/errorToast";
import "beercss";
import "./recipeForm.css";

const RecipeForm = ({ mode = "create", initialData = {}, onSubmit }) => {
  const [recipeName, setRecipeName] = useState(initialData.recipeName || "");
  const [recipeType, setRecipeType] = useState(initialData.recipeType || "category");
  const [spiceLvl, setSpiceLvl] = useState(initialData.spiceLvl || "category");
  const [previewImage, setPreviewImage] = useState(initialData.image || "src/assets/images/HHK-logo.png");
  const [imageFile, setImageFile] = useState(null);
  const [ingredients, setIngredients] = useState(initialData.ingredients || [{ quantity: "", unit: "pce", ingredient: "" }]);
  const [instructions, setInstructions] = useState(
    initialData.instructions?.map(ins => ({ step: ins.step || "", text: ins.text || "" })) || [{ step: "", text: "" }]
  );
  const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate();

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

    const uploadImageToCloudinary = async (imageFile) => {
    if (!imageFile) {
      console.error("Aucun fichier image sélectionné.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "HitomiHK"); // Remplacez par votre propre preset

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dwtspfxgz/image/upload", formData);
      console.log("Upload réussi :", response.data);
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

  const handleInstructionChange = (index, field, value) => {
    const newInstructions = [...instructions];
    newInstructions[index][field] = value;
    setInstructions(newInstructions);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, { step: "", text: "" }]);
  };

  const handleRemoveInstruction = (index) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(newInstructions);
  };

  const validateForm = () => {
    const errors = [];
    if (!recipeName.trim()) errors.push("Nom de la recette");
    if (recipeType === "category") errors.push("Type de plat");
    if (mode === "create" && !imageFile) errors.push("Image");

    const hasIncompleteIngredients = ingredients.some(
      (i) => !i.quantity?.trim() || !i.unit?.trim() || !i.ingredient?.trim()
    );
    if (hasIncompleteIngredients) errors.push("certains ingrédients ne sont pas complets");

    const hasIncompleteInstructions = instructions.some(
      (ins) => !ins.step?.trim() || !ins.text?.trim()
    );
    if (hasIncompleteInstructions) errors.push("certaines instructions ne sont pas complètes");

    return errors;
  };

  const resetForm = () => {
    setRecipeName("");
    setRecipeType("category");
    setSpiceLvl("category");
    setPreviewImage("src/assets/images/HHK-logo.png");
    setImageFile(null);
    setIngredients([{ quantity: "", unit: "pce", ingredient: "" }]);
    setInstructions([{ step: "", text: "" }]);
    setFormErrors([]);
  };

  const getSpiceLevelId = (lvl) => {
    switch (lvl) {
      case "lowSpice": return "1";
      case "mediumSpice": return "2";
      case "highSpice": return "3";
      case "dieSpice": return "4";
      default: return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let imageUrl = "";
    // Vérifier si une image a été sélectionnée et l'uploader
    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
    } 

    const errors = validateForm();
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    const spiceLvlId = getSpiceLevelId(spiceLvl);
    const recipeSlug = recipeName.toLowerCase().replace(/\s+/g, '-');

    const recipeData = {
    recipeName,
      recipeType,
      spiceLvl,
      spiceLvlId, // Assurez-vous que c'est le bon format pour votre API
      slug: recipeSlug,
      image: imageUrl, // Utiliser l'URL de l'image upload
      ingredients : ingredients.map(ing => ({
        quantity: ing.quantity,
        unit: ing.unit,
        ingredient: ing.ingredient
      })),
      instructions: instructions.map((ins => ({
          step: ins.step,
          text: ins.text
      })))
    };

    // 
    try {
      if (mode === "create") {
        // loading true
        await api.post("/recipes", recipeData); 
        // loading false
        
        /**
         * mettre une barre de chargement dans le .then
         * mettre l'alerte dans le .then
         * 
         * 
         */
        
        
        alert("Recette ajoutée avec succès !");
      } else {
        await onSubmit(recipeData, imageFile);
      }
      resetForm();
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
      if (error.response && error.response.status === 401){
        navigate("/login");
      }
      alert("Erreur pendant l'envoi. Veuillez réessayer.");
    }
  };

  useEffect(() => {
    const closeOnClick = () => {
      if (formErrors.length > 0) setFormErrors([]);
    };
    document.addEventListener("click", closeOnClick);
    return () => document.removeEventListener("click", closeOnClick);
  }, [formErrors]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="row select-container">
        <div>
          <legend htmlFor="recipeType">Type de plat :</legend>
          <div className="field suffix border round fill">
            <select name="recipeType" value={recipeType} onChange={(e) => setRecipeType(e.target.value)}>
              <option value="category">Catégorie</option>
              <option value="starter">Entrée</option>
              <option value="main">Plat principal</option>
              <option value="dessert">Dessert</option>
            </select>
            <i>arrow_drop_down</i>
          </div>
        </div>
        <div>
          <legend htmlFor="spiceLvl">Niveau d'épice :</legend>
          <div className="field suffix border round fill">
            <select name="spiceLvl" value={spiceLvl} onChange={(e) => setSpiceLvl(e.target.value)}>
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
        <img className="top-round left-round medium" src={previewImage} alt="Aperçu de l'image" />
        <button className="circle" type="button">
          <i>image</i>
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </button>
      </div>

      <legend>Nom de la recette :</legend>
      <div className="field label max border round fill">
        <input type="text" id="recipeName" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} required />
        <label>Nom de la recette</label>
      </div>

      {/* Ingrédients */}
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
            <span>ajouter un ingrédient</span>
          </button>
        </div>
      </fieldset>

      {/* Instructions */}
      <fieldset className="fieldset">
        <legend>Les instructions</legend>
        {instructions.map((ins, i) => (
          <div className="column fieldset" key={i}>
            <div className="max">
              <div className="row">
                <div className="field label max border round fill">
                  <input value={ins.step} onChange={(e) => handleInstructionChange(i, 'step', e.target.value)} />
                  <label>{`Étape ${i + 1}`}</label>
                </div>
                <button type="button" onClick={() => handleRemoveInstruction(i)}><i>close</i></button>
              </div>
            </div>
            <div className="max">
              <div className="field textarea label border round fill extra">
                <textarea value={ins.text} onChange={(e) => handleInstructionChange(i, 'text', e.target.value)}></textarea>
                <label>Instructions</label>
              </div>
            </div>
          </div>
        ))}
        <div className="add-button">
          <button className="extend circle right-round bottom-round small-elevate primary" type="button" onClick={handleAddInstruction}>
            <i>add</i>
            <span>ajouter une instruction</span>
          </button>
        </div>
      </fieldset>

      <div>
        <button className="submit-button" type="submit">
          {mode === "edit" ? "Mettre à jour" : "Ajouter"}
        </button>
      </div>

      <ErrorToast formErrors={formErrors} />
    </form>
  );
};

export default RecipeForm;
