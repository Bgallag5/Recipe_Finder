import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import App, { AppContext } from "../App";

import NewIngredient from "./NewIngredient";

export default function AddRecipe() {
  const { addRecipeRef, handleToggleModal } = useContext(AppContext);

  const [formState, setFormState] = useState({
    id: uuidv4(),
    title: "",
    url: "",
    image: "",
    publisher: "",
    prepTime: "",
    servings: "",
    ingredients: [
      {
        id: uuidv4(),
        name: "",
        quantity: "",
        units: "",
      },
    ],
  });
  console.log(addRecipeRef);

  function closeModal() {
    handleToggleModal();
  }

  const handleAddIngredient = (e) => {
    e.preventDefault();
    let newIngredient = { id: uuidv4(), name: "", quantity: "", units: "" };
    setFormState({
      ...formState,
      ingredients: [...formState.ingredients, newIngredient],
    });
  };

  //on Modal popup => add classlist .overlay to doc body for blur

  return (
    <div ref={addRecipeRef} className="add-recipe-window hidden">
      <button onClick={closeModal} className="btn--close-modal">
        &times;
      </button>
      <div className="upload-header__container">
        <h2 className="upload__heading">Data</h2>
        <h2 className="upload__heading">Ingredients</h2>
      </div>
      <form className="upload">
        <div className="upload__column">
          <label>Title</label>
          <input value={formState.title} />
          <label>URL</label>
          <input value={formState.url} />
          <label>Image URL</label>
          <input value={formState.image} />
          <label>Publisher</label>
          <input value={formState.publisher} />
          <label>Servings</label>
          <input value={formState.servings} />
          <label>Prep Time</label>
          <input value={formState.prepTime} />
        </div>
        <div className="upload__ingredients">
          {formState.ingredients.map((el) => {
            return <NewIngredient />;
          })}
          {/* <label>Title</label>
          <input value={formState.title} />
          <label>Title</label>
          <input value={formState.title} />
          <label>Title</label>
          <input value={formState.title} />
          <label>Title</label>
          <input value={formState.title} />
          <label>Title</label>
          <input value={formState.title} /> */}
        </div>
        <button className="upload__btn btn">Upload Recipe</button>
        <button onClick={handleAddIngredient} className="upload__btn btn">
          Add Ingredient
        </button>
      </form>
    </div>
  );
}
