import React, { useContext } from "react";
import { AppContext } from "../App";
import RecipePreviewCard from "./RecipePreviewCard";
import NoResults from "./AppMessages/NoResults";

export default function SearchResults() {
  //consume and destructure context
  const { searchResults } = useContext(AppContext);
  console.log(searchResults);

  //if no search results return blank div; if searchResults.length = 0 return 'No Results'
  return searchResults ? (
    searchResults.length > 0 ? (
      <div className="search-results">
        <ul className="results">
          {searchResults &&
            searchResults.map((recipe) => (
              <RecipePreviewCard recipe={recipe} />
            ))}
        </ul>

        <div className="pagination">
          <button className="btn--inline pagination__btn--prev">
            <svg className="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page 1</span>
          </button>
          <button className="btn--inline pagination__btn--next">
            <span>Page 3</span>
            <svg className="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
        </div>

        <p className="copyright">
          &copy; Copyright by
          <a
            className="twitter-link"
            target="_blank"
            href="https://twitter.com/jonasschmedtman"
            rel="noreferrer"
          >
            {` Jonas Schmedtmann`}
          </a>
        </p>
      </div>
    ) : (
      <NoResults />
    )
  ) : (
    <div></div>
  );
}
