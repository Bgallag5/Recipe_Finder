import React, { useContext, useState } from "react";
import logo from "../images/logo.png";
import { getRecipeIDs } from "../utils/API";
import { AppContext } from "../App";

import RecipePreviewCard from "./RecipePreviewCard";

export default function Header() {
  const { setSearchResults, handleToggleModal, bookmarks } = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState("");


  const handleRecipeSearch = async (e) => {
    e.preventDefault();
    let recipePreviewData = await getRecipeIDs(searchTerm);
    setSearchResults(recipePreviewData);
  };

  //handle searching - debounce
  const handleSearchString = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClickAdd = () => {
    handleToggleModal();
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <form className="search">
        <input
          type="text"
          className="search__field"
          placeholder="Search over 1,000,000 recipes..."
          value={searchTerm}
          onChange={handleSearchString}
        />
        <button className="btn search__btn" onClick={handleRecipeSearch}>
          <i>
            <span className="material-icons search__icon">search</span>
          </i>
          <span>Search</span>
        </button>
      </form>

      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <button
              onClick={handleClickAdd}
              className="nav__btn nav__btn--add-recipe"
            >
              <i>
                <span className="material-icons nav__icon header-nav-button">
                  add
                </span>
              </i>
              <span>Add recipe</span>
            </button>
          </li>
          <li className="nav__item">
            <button className="nav__btn nav__btn--bookmarks">
              <i>
                <span className="material-icons nav__icon header-nav-button">
                  bookmark_border
                </span>
              </i>
              <span>Bookmarks</span>
            </button>
            <div className="bookmarks">
              <ul className="bookmarks__list">
                {bookmarks ? (
                  bookmarks.map((bookmark) => {
                    return <RecipePreviewCard recipe={bookmark} />;
                  })
                ) : (
                  <div className="message">
                    <p>
                      No bookmarks yet. Find a nice recipe and bookmark it :)
                    </p>
                  </div>
                )}
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
