import React from "react";
import Header from "../../components/header/header";
import RecipeForm from "../../components/recipeForm/recipeForm";
import axios from "axios";
import { api } from "../../helpers/api";

const NewRecipe = () => {
  const handleCreate = async (recipeData, imageFile, resetForm) => {
    try {
      let imageUrl = "";

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "HitomiHK");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dwtspfxgz/image/upload",
          formData
        );
        imageUrl = response.data.secure_url;
      }

      const finalRecipe = {
        ...recipeData,
        image: imageUrl,
      };

      await api.post("/recipes", finalRecipe);
      alert("Recette ajoutée avec succès !");
      resetForm();
    } catch (error) {
      console.error("Erreur d'ajout :", error);
    }
  };

  return (
    <>
      <Header />
      <h3>Créer une nouvelle recette</h3>
      <div className="form-container">
        <RecipeForm mode="create" onSubmit={handleCreate} />
      </div>
    </>
  );
};

export default NewRecipe;