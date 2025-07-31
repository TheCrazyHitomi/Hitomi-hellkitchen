import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/header";
import ErrorToast from "../../components/errorToast/errorToast";
import "beercss"
import "./newRecipe.css";


const NewRecipe = () => {
  // Fonction pour gérer la soumission du formulaire
  const [recipeName, setRecipeName] = React.useState("");
  const [recipeType, setRecipeType] = React.useState("category");
  const [spiceLvl, setSpiceLvl] = React.useState("category"); 
  const [previewImage, setPreviewImage] = React.useState("src/assets/images/HHK-logo.png");
  const [imageFile, setImageFile] = React.useState(null);
  const [ingredients, setIngredients] = React.useState([{ quantity: "", unit: "pce", ingredient: "" }]);
  const [instructions, setInstructions] = React.useState([{ step: "", text: "" }]);



  // Fonction pour gérer le changement d'image
  // Cette fonction est appelée lorsque l'utilisateur sélectionne une image
  // Elle met à jour l'état de l'image et crée un aperçu de l'image sélectionnée

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

  // Fonctions pour gérer les changements dans les ingrédients
  // Ces fonctions mettent à jour l'état des ingrédients en fonction des entrées
  // Elles permettent également d'ajouter ou de supprimer des ingrédients

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

  // Fonctions pour gérer les changements dans les instructions
  // Elles mettent à jour l'état des instructions en fonction des entrées
  // Elles permettent également d'ajouter ou de supprimer des instructions

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



  // Fonction pour valider le formulaire
  // Elle vérifie que tous les champs requis sont remplis
  // Elle retourne un tableau d'erreurs si des champs sont manquants
  // Sinon, elle retourne un tableau vide
  // Cette fonction est appelée avant la soumission du formulaire pour s'assurer que toutes les données sont valides
const validateForm = () => {
  const errors = [];

  if (!recipeName.trim()) errors.push("Nom de la recette");
  if (recipeType === "category") errors.push("Type de plat");
  if (!imageFile) errors.push("Image");
  
  const hasValidIngredients = ingredients.some(
    (i) => !i.quantity?.trim() || !i.unit?.trim() || !i.ingredient?.trim()
  );
  if (hasValidIngredients) errors.push("certains ingrédients ne sont pas complets");

  const hasInstructions = instructions.some(
    (ins) => !ins.step?.trim() || !ins.text?.trim()
  );
  if (hasInstructions) errors.push("certaines instructions ne sont pas complètes");

  return errors;
};

const [formErrors, setFormErrors] = useState([]);

  // Fonction pour gérer la soumission du formulaire
  // Elle empêche le comportement par défaut du formulaire, prépare les données de la recette
  // et envoie une requête POST à l'API pour ajouter la nouvelle recette
  // Elle gère également l'upload de l'image si une image a été sélectionnée
  // En cas de succès, elle affiche un message de succès, sinon elle affiche une erreur

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    let imageUrl = "";
    // Vérifier si une image a été sélectionnée et l'uploader
    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
    } 

    // const formattedIngredients = ingredients.map(ing => `${ing.quantity} ${ing.unit} ${ing.ingredient}`).join(", ");  

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

const recipeSlug = recipeName.toLowerCase().replace(/\s+/g, '-'); // Générer un slug à partir du nom de la recette



const errors = validateForm();
  if (errors.length > 0) {
    setFormErrors(errors);
    return;
  }

  try {

    const newRecipe = {
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

    console.log("Nouvelle recette :", newRecipe);

      const response = await axios.post("http://localhost:3000/api/recipes", newRecipe); 
      const result = response.data;
      alert("Recette ajoutée avec succès !");
      resetForm(); // Réinitialiser le formulaire après la soumission réussie
      console.log("Nouvelle recette ajoutée :", result);
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout de la recette :", error);
      alert("Erreur lors de l'ajout de la recette. Veuillez réessayer.");
    }
  };

  // Effet pour gérer le clic en dehors de la liste d'erreurs
  // Il permet de fermer la liste d'erreurs lorsque l'utilisateur clique en dehors de celle-ci
  // Cela améliore l'expérience utilisateur en évitant que la liste reste ouverte indéfiniment
  // Il utilise un écouteur d'événements pour détecter les clics


    useEffect(() => {
        const handleclickOutside = () => {
            if(formErrors.length > 0) {
                setFormErrors([]);
            }
        }
        document.addEventListener("click", handleclickOutside);
        return () => {
            document.removeEventListener("click", handleclickOutside);
        }
    }, [formErrors]);


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
  
  // Rendu du composant NewRecipe
  // Il affiche le formulaire pour ajouter une nouvelle recette
  // Le formulaire comprend des sélecteurs pour le type de plat et le niveau d'épice
  // Des champs pour le nom de la recette, les ingrédients et les instructions  

  return (
    <>
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
          <button className="circle" onChange={handleImageChange} type="button">
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
          {instructions.map((ins, i) => (
            <div className="column fieldset" key={i}>
              <div className="max">
                <div className="row">
                <div className="field label max border round fill">
                  <input value={ins.step} onChange={(e) => handleInstructionChange(i, 'step', e.target.value)}/>
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

  <div>
    <ErrorToast formErrors={formErrors} />
  </div>
</>
  );
};

export default NewRecipe;
