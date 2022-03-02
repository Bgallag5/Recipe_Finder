import React, { useContext } from "react";
import { AppContext } from "../App";
import { getSingleRecipeData } from "../utils/API";

export default function RecipePreviewCard(props) {
  const { setLoading, setHash, bookmarks, setBookmarks } = useContext(AppContext);
  const { id, title, img } = props.recipe;

  const handleRecipeClick = async () => {
    //   //setLoading = true
    //  setLoading(true)
    //  const recipeData = await getSingleRecipeData(id);
    //  console.log(recipeData);
    //  // setCurrentRecipe(recipeData) => setHash here and listen for hash change in App - hash change to trigger setCurrent?
    //  setCurrentRecipe(recipeData)
    //  setLoading(false)

    setHash(id);
  };

  const handleDeleteBookmark = (id) => {
    //state and LS
    let bookmarksCopy = bookmarks;
    const newBookmarks = bookmarksCopy.filter(el => el.id !== id);
    console.log(newBookmarks);
    localStorage.setItem('recipe-bookmarks', JSON.stringify(newBookmarks))
    setBookmarks(newBookmarks);
  }

  return (
    <li className="preview" key={id}>
      {props.bookmark && (
        <button onClick={() => handleDeleteBookmark(id)} className="bookmark-delete-btn">
          &times;
        </button>
      )}
          <a className="preview__link" onClick={handleRecipeClick} href={`#${id}`}>
        <figure className="preview__fig">
          <img src={img} alt={title} />
        </figure>
        <div className="preview__data">
          <h4 className="preview__title">{title}</h4>
          <p className="preview__publisher">The Pioneer Woman</p>
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
