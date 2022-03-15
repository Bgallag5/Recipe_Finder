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
  const [bookmarks, setBookmarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [appError, setAppError] = useState(null);
  const [appMessage, setAppMessage] = useState("");
  const [modalVisible, toggleModalVisible] = useState(false)

  //on load get bookmarks, set them as state
  useEffect(() => {
    let myBookmarks = JSON.parse(localStorage.getItem("recipe-bookmarks"));
    setBookmarks(myBookmarks);
  }, []);

  //take recipe object, add to bookmarks
  const handleAddBookmark = (currentRecipe) => {
    //validate and add bookmark
   let res = addBookmark(currentRecipe);
   console.log(res);
    //re-fetch and set state
    let newBookmarks = JSON.parse(localStorage.getItem("recipe-bookmarks"));
    setBookmarks(newBookmarks);
    //toggle confirm message
    setAppMessage({ msg: res.msg, type: "bookmarkAdded", timer: 3000 });
  };

  const addRecipeRef = useRef();
  const overlayRef = useRef();

  const fetchSingleRecipe = async (id) => {
    setLoading(true);
    try {
      const recipeData = await getSingleRecipeData(id);
      //if no error setRecipe Data
      setCurrentRecipe(recipeData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setAppError(err.message);
    }
  };

  const handleToggleModal = () => {
    // addRecipeRef.current?.classList.toggle("hidden");
    toggleModalVisible(!modalVisible)
    // overlayRef.current.classList.toggle("hidden");
  };

  const globalState = {
    handleToggleModal,
    modalVisible,
    toggleModalVisible,
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
      <div ref={overlayRef} className={`overlay ${modalVisible ? '' : 'hidden'}`}></div>
      <AddRecipe />
    </AppContext.Provider>
  );
}

export default App;
