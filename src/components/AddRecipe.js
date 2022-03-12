import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../App";

import NewIngredient from "./NewIngredient";
import { createNewRecipe } from "../utils/helpers";

import AppMessage from "./AppMessages/AppMessage";

export default function AddRecipe() {
  const { addRecipeRef, handleToggleModal, handleAddBookmark, setAppMessage } =
    useContext(AppContext);
  // const [modalVisible, toggleModalVisible] = useState(false)

  const [ingredients, setIngredients] = useState([
    {
      id: uuidv4(),
      description: "",
      quantity: "",
      unit: "",
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

  const deleteIngredient = (e, ingredient) => {
    e.preventDefault();
    let currentIngredients = ingredients;
    const filtered = currentIngredients.filter((el) => el.id !== ingredient.id);
    setIngredients(filtered);
  };

  //update form state
  const handleFormChange = (e) => {
    e.preventDefault();
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  //handle Upload button onClick
  const handleRecipeUpload = async (e) => {
    e.preventDefault();
    //combine form state and ingredients state
    let formData = formState;
    //filter out ingredients that are completely empty
    for (const field of Object.values(formData)) {
      console.log(field);
      if (!field) {
        //setAppMessage
        setAppMessage({
          msg: "Please Fill Out All Fields",
          type: "incompleteForm",
          timer: 3000,
        });
        return;
      }
    }
    // parse the rest and if any of them are partially filled, prompt to finish or delete ingredient
    //pop up error msg if fields are empty
    formData.ingredients = [...ingredients];
    const newRecipe = await createNewRecipe(formData);
    console.log(newRecipe);
    if (newRecipe.status === "success") {
      handleAddBookmark(newRecipe);
      handleToggleModal();
      return;
    } else if (newRecipe.status === "fail") {
      setAppMessage({
        msg: `Could not upload recipe: ${newRecipe.message}`,
        type: "incompleteForm",
        timer: 8000,
      });
    }
  };

  // useEffect(() => {
  //   console.log(modalVisible);
  //   let handler = (e) => {
  //     if (modalVisible && !addRecipeRef?.current.contains(e.target)) {
  //       console.log('CLICK OUTSIDE MODAL');
  //       handleToggleModal();
  //     }
  //   };
  //   // console.log(!modalVisible);
  //     document.addEventListener("mousedown", handler);

  //   return () => {
  //     document.removeEventListener("mousedown", handler);
  //   };
  // });

  useEffect(() => {});

  console.log(ingredients);

  return (
    ingredients && (
      <div ref={addRecipeRef} className="add-recipe-window hidden">
        <button onClick={closeModal} className="btn--close-modal">
          &times;
        </button>
        <AppMessage />
        <div className="upload-header__container">
          <h2 className="upload__heading">Info</h2>
          <h2 className="upload__heading">Ingredients</h2>
        </div>
        <div className="upload">
          <form onChange={handleFormChange}>
            <div className="upload__column">
              <label>Title</label>
              <input
                name="title"
                value={formState.title}
                onChange={function () {}}
              />
              <label>URL</label>
              <input
                type="url"
                name="url"
                value={formState.url}
                onChange={function () {}}
              />
              <label>Image URL</label>
              <input
                type="url"
                name="image"
                value={formState.image}
                onChange={function () {}}
              />
              <label>Publisher</label>
              <input
                name="publisher"
                value={formState.publisher}
                onChange={function () {}}
              />
              <label>Servings</label>
              <input
                onChange={function () {}}
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
                onChange={function () {}}
              />
            </div>
          </form>
          <form>
            <div className="upload__ingredients">
              {ingredients &&
                ingredients.map((ingredient, i) => {
                  return (
                    <NewIngredient
                      handleIngredientsChange={handleIngredientsChange}
                      ingredient={ingredient}
                      i={i}
                      deleteIngredient={deleteIngredient}
                    />
                  );
                })}
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
    )
  );
}
