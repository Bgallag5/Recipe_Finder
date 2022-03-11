import React, { useContext } from "react";
import { AppContext } from "../App";
import { getSingleRecipeData } from "../utils/API";

export default function RecipePreviewCard(props) {
  const {
    setLoading,
    getSingleRecipeData,
    bookmarks,
    setBookmarks,
    fetchSingleRecipe,
  } = useContext(AppContext);
  const { id, title, img, publisher } = props.recipe;
  console.log(props.recipe);

  const handleRecipeClick = (id) => {
    fetchSingleRecipe(id);
  };

  const handleDeleteBookmark = (id) => {
    //state and LS
    let bookmarksCopy = bookmarks;
    const newBookmarks = bookmarksCopy.filter((el) => el.id !== id);
    console.log(newBookmarks);
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
          {/* <div class="preview__user-generated">
            <svg>
              <use href="src/img/icons.svg#icon-user"></use>
            </svg>
          </div> */}
        </div>
      </a>
    </li>
  );
}

// <li class="preview">
//   <a class="preview__link preview__link--active" href="#23456">
//     <figure class="preview__fig">
//       <img src="src/img/test-1.jpg" alt="Test" />
//     </figure>
//     <div class="preview__data">
//       <h4 class="preview__title">Pasta with Tomato Cream ...</h4>
//       <p class="preview__publisher">The Pioneer Woman</p>
//       <div class="preview__user-generated">
//         <svg>
//           <use href="src/img/icons.svg#icon-user"></use>
//         </svg>
//       </div>
//     </div>
//   </a>
// </li>
