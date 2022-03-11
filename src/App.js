import React, { useState, useRef, useEffect } from "react";

import "./css/main.css";
import { getSingleRecipeData } from "./utils/API";
import { addBookmark } from "./utils/helpers";

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
  const [appError, setAppError] = useState(null);
  const [appMessage, setAppMessage] = useState("");
  const [bookmarks, setBookmarks] = useState("");

  useEffect(() => {
    let myBookmarks = JSON.parse(localStorage.getItem("recipe-bookmarks"));
    setBookmarks(myBookmarks);
  }, []);

  const handleAddBookmark = async (currentRecipe) => {
    addBookmark(currentRecipe);
    let newBookmarks = JSON.parse(localStorage.getItem("recipe-bookmarks"));
    setBookmarks(newBookmarks);
    //toggle confirm message
    setAppMessage("Added to Bookmarks!");
  };

  const addRecipeRef = useRef();
  const overlayRef = useRef();

  const fetchSingleRecipe = async (id) => {
    try {
      setLoading(true);
      const recipeData = await getSingleRecipeData(id);
      //if no error setRecipe Data
      console.log(recipeData);
      setCurrentRecipe(recipeData);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setAppError(err.message);
    }
  };

  const handleToggleModal = () => {
    addRecipeRef.current.classList.toggle("hidden");
    overlayRef.current.classList.toggle("hidden");
  };

  const globalState = {
    handleToggleModal,
    searchResults,
    setSearchResults,
    currentRecipe,
    setCurrentRecipe,
    bookmarks,
    setBookmarks,
    loading,
    setLoading,
    fetchSingleRecipe,
    addRecipeRef,
    overlayRef,
    appError,
    setAppError,
    appMessage,
    setAppMessage,
    handleAddBookmark
  };

  return (
    <AppContext.Provider value={globalState}>
      <div className="container">
        <Header />
        <SearchResults />
        <RecipeDisplay />
      </div>
      <div ref={overlayRef} className="overlay hidden"></div>
      <AddRecipe />
    </AppContext.Provider>
  );
}

export default App;
