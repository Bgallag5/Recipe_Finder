import React, { useState, useRef, useEffect } from "react";

import "./css/main.css";
import { getRecipeIDs } from "./utils/API";
import { getSingleRecipeData } from "./utils/API";

import Header from "./components/Header";
import SearchResults from "./components/SearchResults";
import RecipeDisplay from "./components/RecipeDisplay";
import AddRecipe from "./components/AddRecipe";

//create global context
export const AppContext = React.createContext();

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [currentRecipe, setCurrentRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [hash, setHash] = useState(null);
  const [appError, setAppError] = useState(null);

  const addRecipeRef = useRef();
  const overlayRef = useRef() 

  //5ed6604691c37cdc054bd0f2
  const ids = ['5ed6604691c37cdc054bd0f2', 'gaa5q691c37cdc054bd0f']
  useEffect(() => {
    localStorage.setItem('recipe-bookmarks', JSON.stringify(ids))
  }, [])

  console.log(hash);

  const handleHashChange = async () => {
    console.log(window.location.hash.slice(1));
    setHash(window.location.hash.slice(1))
    try {
      setLoading(true)
      const recipeData = await getSingleRecipeData(window.location.hash.slice(1));
      //if no error setRecipe Data
      console.log(recipeData);
      setCurrentRecipe(recipeData);
      setLoading(false)
    } catch (err) {
        console.log(err.message);
        setLoading(false);
        setAppError(err.message);
    }
  }

  //listen for hash change, onchange fetch single data with hash id
  useEffect(() => {
   hash && handleHashChange();
  }, [hash]);

  const handleToggleModal = () => {
    addRecipeRef.current.classList.toggle('hidden');
    overlayRef.current.classList.toggle('hidden');
  }

  // window.addEventListener('hashchange', handleHashChange)

  const globalState = {
    handleToggleModal,
    searchResults,
    setSearchResults,
    currentRecipe,
    setCurrentRecipe,
    bookmarks: "",
    loading,
    setLoading,
    setHash,
    addRecipeRef,
    overlayRef,
  };

  console.log(currentRecipe);

  return (
    <AppContext.Provider value={globalState}>
      <div  className="container">
        <Header />
        <SearchResults />
        <RecipeDisplay />
        </div>
        <div ref={overlayRef} className="overlay hidden"></div>
        <AddRecipe />
        {/* <div className="recipe">
          <div className="message">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-smile"></use>
              </svg>
            </div>
            <p>Start by searching for a recipe or an ingredient. Have fun!</p>
          </div> 

           <div className="spinner">
            <svg>
              <use href="src/img/icons.svg#icon-loader"></use>
            </svg>
          </div> 

           <div className="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>No recipes found for your query. Please try again!</p>
          </div>

          <figure className="recipe__fig">
            <img
              src="src/img/test-1.jpg"
              alt="Tomato"
              className="recipe__img"
            />
            <h1 className="recipe__title">
              <span>Pasta with tomato cream sauce</span>
            </h1>
          </figure>

          <div className="recipe__details">
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use href="src/img/icons.svg#icon-clock"></use>
              </svg>
              <span className="recipe__info-data recipe__info-data--minutes">
                45
              </span>
              <span className="recipe__info-text">minutes</span>
            </div>
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use href="src/img/icons.svg#icon-users"></use>
              </svg>
              <span className="recipe__info-data recipe__info-data--people">
                4
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
            <button className="btn--round">
              <svg className="">
                <use href="src/img/icons.svg#icon-bookmark-fill"></use>
              </svg>
            </button>
          </div>

          <div className="recipe__ingredients">
            <h2 className="heading--2">Recipe ingredients</h2>
            <ul className="recipe__ingredient-list">
              <li className="recipe__ingredient">
                <svg className="recipe__icon">
                  <use href="src/img/icons.svg#icon-check"></use>
                </svg>
                <div className="recipe__quantity">1000</div>
                <div className="recipe__description">
                  <span className="recipe__unit">g</span>
                  pasta
                </div>
              </li>

              <li className="recipe__ingredient">
                <svg className="recipe__icon">
                  <use href="src/img/icons.svg#icon-check"></use>
                </svg>
                <div className="recipe__quantity">0.5</div>
                <div className="recipe__description">
                  <span className="recipe__unit">cup</span>
                  ricotta cheese
                </div>
              </li>
            </ul>
          </div>

          <div className="recipe__directions">
            <h2 className="heading--2">How to cook it</h2>
            <p className="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span className="recipe__publisher">The Pioneer Woman</span>.
              Please check out directions at their website.
            </p>
            <a
              className="btn--small recipe__btn"
              href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
              target="_blank"
            >
              <span>Directions</span>
              <svg className="search__icon">
                <use href="src/img/icons.svg#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
        </div> */}

      {/* <div className="overlay hidden"></div>
      <div className="add-recipe-window hidden">
        <button className="btn--close-modal">&times;</button>
        <form className="upload">
          <div className="upload__column">
            <h3 className="upload__heading">Recipe data</h3>
            <label>Title</label>
            <input value="TEST" required name="title" type="text" />
            <label>URL</label>
            <input value="TEST" required name="sourceUrl" type="text" />
            <label>Image URL</label>
            <input value="TEST" required name="image" type="text" />
            <label>Publisher</label>
            <input value="TEST" required name="publisher" type="text" />
            <label>Prep time</label>
            <input value="23" required name="cookingTime" type="number" />
            <label>Servings</label>
            <input value="23" required name="servings" type="number" />
          </div>

          <div className="upload__column">
            <h3 className="upload__heading">Ingredients</h3>
            <label>Ingredient 1</label>
            <input
              value="0.5,kg,Rice"
              type="text"
              required
              name="ingredient-1"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 2</label>
            <input
              value="1,,Avocado"
              type="text"
              name="ingredient-2"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 3</label>
            <input
              value=",,salt"
              type="text"
              name="ingredient-3"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 4</label>
            <input
              type="text"
              name="ingredient-4"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 5</label>
            <input
              type="text"
              name="ingredient-5"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 6</label>
            <input
              type="text"
              name="ingredient-6"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
          </div>

          <button className="btn upload__btn">
            <svg>
              <use href="src/img/icons.svg#icon-upload-cloud"></use>
            </svg>
            <span>Upload</span>
          </button>
        </form>
      </div> */}
    </AppContext.Provider>
  );
}

export default App;
