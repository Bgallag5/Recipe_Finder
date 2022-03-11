import React, { useContext } from "react";
import { AppContext } from "../App";

export default function RecipePreviewCard(props) {
  const { bookmarks, setBookmarks, fetchSingleRecipe } = useContext(AppContext);
  const { id, title, img, publisher } = props.recipe;
  console.log(props.recipe);

  const handleRecipeClick = (id) => {
    fetchSingleRecipe(id);
  };

  const handleDeleteBookmark = (id) => {
    //state and LS
    let bookmarksCopy = bookmarks;
    const newBookmarks = bookmarksCopy.filter((el) => el.id !== id);
    localStorage.setItem("recipe-bookmarks", JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
  };

  // const imageEl = () => {
  //     if we have a real image: return JSX img like normal
  //     else no real img source? display placeholder img
  // }

  return (
    <li className="preview" key={id}>
      {props.bookmark && (
        <button
          title="Delete Bookmark?"
          onClick={() => handleDeleteBookmark(id)}
          className="bookmark-delete-btn"
        >
          &times;
        </button>
      )}
      <a
        className="preview__link"
        onClick={() => handleRecipeClick(id)}
        href={`#${id}`}
      >
        <figure className="preview__fig">
          <img src={img} alt={title} />
        </figure>
        <div className="preview__data">
          <h4 className="preview__title">{title}</h4>
          <p className="preview__publisher">{publisher}</p>
        </div>
      </a>
    </li>
  );
}
