import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../App";

import NewIngredient from "./NewIngredient";
import { createNewRecipe } from "../utils/helpers";

export default function AddRecipe() {
  const { addRecipeRef, handleToggleModal } = useContext(AppContext);

  const [ingredients, setIngredients] = useState([
    {
      id: uuidv4(),
      description: "",
      quantity: "",
      unit: "",
      num: 1,
    },
  ]);

  const [formState, setFormState] = useState({
    id: uuidv4(),
    title: "",
    url: "",
    image: "",
    publisher: "",
    prepTime: "",
    servings: "",
  });

  function closeModal() {
    handleToggleModal();
  }

  const handleAddIngredient = (e) => {
    e.preventDefault();
    let newIngredient = {
      num: ingredients.length + 1,
      id: uuidv4(),
      description: "",
      quantity: "",
      unit: "",
    };
    setIngredients([...ingredients, newIngredient]);
  };

  //update ingredients state
  const handleIngredientsChange = (e, i) => {
    let oldIngredients = [...ingredients];
    oldIngredients[i][e.target.name] = e.target.value;
    setIngredients([...oldIngredients]);
  };

  //update form state
  const handleFormChange = (e) => {
    e.preventDefault();
    console.log(formState);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  //handle Upload button onClick
  const handleRecipeUpload = async (e) => {
    e.preventDefault();
    //combine form state and ingredients state
    let formData = formState;
    formData.ingredients = [...ingredients];
    createNewRecipe(formData);
  };

  //this was blocking links to the recipe page 

//  addRecipeRef && console.log(addRecipeRef.current.className.split(' ').includes('hidden'));
  //     addRecipeRef.current?.className.split(' ').includes('hidden') && document.addEventListener("click", (e) => {
  //   if (addRecipeRef.current.contains(e.target)) return;
  //   handleToggleModal();
  // });

  return (
    <div ref={addRecipeRef} className="add-recipe-window hidden">
      <button onClick={closeModal} className="btn--close-modal">
        &times;
      </button>
      <div className="upload-header__container">
        <h2 className="upload__heading">Info</h2>
        <h2 className="upload__heading">Ingredients</h2>
      </div>
      <div className="upload">
        <form onChange={handleFormChange}>
          <div className="upload__column">
            <label>Title</label>
            <input name="title" value={formState.title} onChange={function(){}} />
            <label>URL</label>
            <input type="url" name="url" value={formState.url} onChange={function(){}}  />
            <label>Image URL</label>
            <input type="url" name="image" value={formState.image} onChange={function(){}}  />
            <label>Publisher</label>
            <input name="publisher" value={formState.publisher} onChange={function(){}}  />
            <label>Servings</label>
            <input
            onChange={function(){}} 
              min={1}
              max={15}
              type="number"
              name="servings"
              value={formState.servings}
            />
            <label>Prep Time</label>
            <input
              placeholder="in minutes"
              type="number"
              name="prepTime"
              value={formState.prepTime}
              onChange={function(){}} 
            />
          </div>
        </form>
        <form>
          <div className="upload__ingredients">
            {ingredients.map((ingredient, i) => {
              return (
                <NewIngredient
                  handleIngredientsChange={handleIngredientsChange}
                  ingredient={ingredient}
                  i={i}
                />
              );
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
        </form>
        <button
          type="submit"
          onClick={(e) => handleRecipeUpload(e)}
          className="upload__btn btn"
        >
          Upload Recipe
        </button>
        <button
          onClick={(e) => handleAddIngredient(e)}
          className="upload__btn btn"
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
}
