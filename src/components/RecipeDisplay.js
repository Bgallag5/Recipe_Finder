import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { addBookmark } from "../utils/helpers";

import StartSearch from "./AppMessages/StartSearch";
import Spinner from "./AppMessages/Spinner";
import Confirm from "./AppMessages/Confirm";

export default function RecipeDisplay() {
  const { currentRecipe, loading, setBookmarks, setAppMessage } =
    useContext(AppContext);

  //add bookmark to localStorage and setState
  const handleAddBookmark = async (currentRecipe) => {
    addBookmark(currentRecipe);
    let newBookmarks = JSON.parse(localStorage.getItem("recipe-bookmarks"));
    setBookmarks(newBookmarks);
    //toggle confirm message
    setAppMessage("Added to Bookmarks!");
  };

  console.log(currentRecipe);
  return loading ? (
    <Spinner />
  ) : currentRecipe ? (
    <div className="recipe">
      <figure className="recipe__fig">
        <img
          src={currentRecipe.image_url}
          alt="Tomato"
          className="recipe__img"
        />
        <h1 className="recipe__title">
          <span>{currentRecipe.title || ""}</span>
        </h1>
      </figure>

      <div className="recipe__details">
        <div className="recipe__info">
          <svg className="recipe__info-icon">
            <use href="src/img/icons.svg#icon-clock"></use>
          </svg>
          <span className="recipe__info-data recipe__info-data--minutes">
            {currentRecipe.cooking_time}
          </span>
          <span className="recipe__info-text">minutes</span>
        </div>
        <div className="recipe__info">
          <svg className="recipe__info-icon">
            <use href="src/img/icons.svg#icon-users"></use>
          </svg>
          <span className="recipe__info-data recipe__info-data--people">
            {currentRecipe.servings}
          </span>
          <span className="recipe__info-text">servings</span>
        </div>
        <Confirm />
        <button
          title="Add Bookmark"
          className="btn--round  bookmark__btn"
          onClick={() => handleAddBookmark(currentRecipe)}
        >
          <i>
            <span className="material-icons">bookmark_border</span>
          </i>
        </button>
      </div>

      <div className="recipe__ingredients">
        <h2 className="heading--2">Recipe ingredients</h2>
        <ul className="recipe__ingredient-list">
          {currentRecipe &&
            currentRecipe.ingredients.map((ingredient) => {
              return (
                <li className="recipe__ingredient">
                  <svg className="recipe__icon">
                    <use href="src/img/icons.svg#icon-check"></use>
                  </svg>
                  <div className="recipe__quantity">{ingredient.quantity}</div>
                  <div className="recipe__description">
                    <span className="recipe__unit">{ingredient.unit} </span>
                    {ingredient.description}
                  </div>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="recipe__directions">
        <h2 className="heading--2">How to cook it</h2>
        <p className="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span className="recipe__publisher"> {currentRecipe.publisher}</span>.
          Please check out directions at their website.
        </p>
        <a
          className="btn--small "
          href={currentRecipe.source_url}
          target="_blank"
          rel="noreferrer"
        >
          <span>Directions</span>
          <i>
            <span className="material-icons directions--btn">arrow_right_alt</span>
          </i>
        </a>
      </div>
    </div>
  ) : (
    <StartSearch />
  );
}
