import React, { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "../App";
import RecipePreviewCard from "./RecipePreviewCard";
import NoResults from "./AppMessages/NoResults";

let page = 0;

export default function SearchResults() {
  //consume and destructure context
  const { searchResults, appError, setAppError, fetchSingleRecipe } =
    useContext(AppContext);

  const [displayedResults, setDisplayedResults] = useState("");
  const nextBtnRef = useRef();
  const prevBtnRef = useRef();

  const paginateResults = (num = 1) => {
    page = page + num;
    // start/end points to slice 10 results
    const start = (page - 1) * 10;
    const end = page * 10;
    let results = searchResults.slice(start, end);
    setDisplayedResults(results);
    fetchSingleRecipe(results[0].id);
  };

  useEffect(() => {
    //reset page to 0 if searchResults change (if user searches another term)
    page = 0;
    searchResults && paginateResults();
  }, [searchResults]);

  useEffect(() => {
    // return if no results yet
    if (!displayedResults) return;

    //clear hidden on both btns
    nextBtnRef.current.classList.remove("hidden");
    prevBtnRef.current.classList.remove("hidden");
    //access bookend elements
    let firstItem = searchResults[0];
    let lastItem = searchResults[searchResults.length - 1];

    //toggle hidden if at end or start
    if (displayedResults.includes(firstItem)) {
      prevBtnRef.current.classList.toggle("hidden");
      return;
    }
    if (displayedResults.includes(lastItem)) {
      nextBtnRef.current.classList.toggle("hidden");
      return;
    }
    return;
  }, [displayedResults]);

  //if error, clear error after 3 seconds
  useEffect(() => {
    clearError();
  }, [appError]);

  function clearError() {
    setTimeout(() => {
      setAppError("");
    }, 3000);
  }

  //if error render error message for 3 seconds
  if (appError) {
    return <NoResults appError={appError} />;
  }
  //if no search results return blank div; if searchResults.length = 0 return 'No Results'
  return displayedResults ? (
    displayedResults.length > 0 ? (
      <div className="search-results">
        <ul className="results">
          {displayedResults &&
            displayedResults.map((recipe) => (
              <RecipePreviewCard recipe={recipe} />
            ))}
        </ul>

        <div className="pagination">
          <button
            ref={prevBtnRef}
            onClick={() => paginateResults(-1)}
            className="btn--inline pagination__btn--prev"
          >
            <i>
              <span className="material-icons directions--btn">
                navigate_before
              </span>
            </i>
            <span>Page {page - 1}</span>
          </button>
          <button
            ref={nextBtnRef}
            onClick={() => paginateResults(1)}
            className="btn--inline pagination__btn--next"
          >
            <span>Page {page + 1}</span>
            <i>
              <span className="material-icons directions--btn">
                keyboard_arrow_right
              </span>
            </i>
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
      <NoResults appError={appError} />
    )
  ) : (
    <div></div>
  );
}
