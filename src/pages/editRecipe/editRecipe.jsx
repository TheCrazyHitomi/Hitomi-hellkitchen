import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/header/header";
import RecipeForm from "../../components/recipeForm/recipeForm";
import axios from "axios";

const EditRecipe = () => {
  const id = useLocation().state?.id || null;

  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState(null);

  // Récupérer les données existantes de la recette
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/recipes/${id}`);
        setRecipeData(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la recette :", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleUpdate = async (updatedData, imageFile) => {
    try {
      let imageUrl = recipeData.image;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "HitomiHK");

        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dwtspfxgz/image/upload",
          formData
        );

        imageUrl = uploadResponse.data.secure_url;
      }

      const finalRecipe = {
        ...updatedData,
        image: imageUrl,
      };

      await axios.put(`http://localhost:3000/api/recipes/${id}`, finalRecipe);
      alert("Recette mise à jour avec succès !");
      navigate("/recettes/" + finalRecipe.slug);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la recette :", error);
      alert("Erreur pendant la mise à jour. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <Header />
      <h3>Modifier la recette</h3>
      <div className="form-container">
        {recipeData ? (
          <RecipeForm
            mode="edit"
            initialData={recipeData}
            onSubmit={handleUpdate}
          />
        ) : (
          <p>Chargement des données de la recette...</p>
        )}
      </div>
    </div>
  );
};

export default EditRecipe;