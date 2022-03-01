import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import NoResults from "./AppMessages/NoResults";
import StartSearch from "./AppMessages/StartSearch";
import Spinner from "./AppMessages/Spinner";

export default function RecipeDisplay() {
  const { currentRecipe, loading } = useContext(AppContext);
  console.log(currentRecipe);
  // {publisher: 'All Recipes', ingredients: Array(8), source_url: 'http://allrecipes.com/Recipe/Cheddar-Bacon-Hamburgers/Detail.aspx', image_url: 'http://forkify-api.herokuapp.com/images/20863b0e4.jpg', title: 'Cheddar Bacon Hamburgers', …}

  const addBookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem('recipe-bookmarks'));
    console.log(bookmarks);
    if (bookmarks == null) return
    localStorage.setItem('recipe-bookmarks', JSON.stringify([...bookmarks, "893072514908ufioweh"]))
  };
  // document.addEventListener('click', addBookmark)
  // addBookmark();          

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

          <div className="recipe__info-buttons">
            <button className="btn--tiny btn--increase-servings">
              <svg>
                <use href="src/img/icons.svg#icon-minus-circle"></use>
              </svg>
            </button>
            <button className="btn--tiny btn--increase-servings">
              <svg>
                <use href="src/img/icons.svg#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div className="recipe__user-generated">
          <svg>
            <use href="src/img/icons.svg#icon-user"></use>
          </svg>
        </div>
        <button className="btn--round" onClick={addBookmark}>
          <svg className="">
            <use href="src/img/icons.svg#icon-bookmark-fill"></use>
          </svg>
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
          className="btn--small recipe__btn"
          href={currentRecipe.source_url}
          target="_blank"
          rel="noreferrer"
        >
          <span>Directions</span>
          <svg className="search__icon">
            <use href="src/images/icons.svg#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    </div>
  ) : (
    <StartSearch />
  );
}
