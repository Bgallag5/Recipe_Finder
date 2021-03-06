import { API_URL, TIMEOUT_SEC, KEY } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
//AJAX POST request to our API; post new recipe
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

      //.race - returns the first Promise to return res or rej
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//add recipe to bookmarks
export const addBookmark = (recipe) => {
    const {id, image_url, title} = recipe;
  let myBookmarks = JSON.parse(localStorage.getItem('recipe-bookmarks'));
  //if no bookmarks, set single item
  if (!myBookmarks){
    localStorage.setItem('recipe-bookmarks', JSON.stringify([{id, img: image_url, title}]));
    return
  }
  const valid = checkBookmarks(myBookmarks, recipe);
  console.log(valid);

  //if valid bookmark, spread and add new item
 valid.status && localStorage.setItem('recipe-bookmarks', JSON.stringify([...myBookmarks, {id, img: image_url, title}]));
 return valid
}

//return true if we can add this recipe to bookmarks
function checkBookmarks(bookmarksArr, recipe){
  //maximum 20 bookmarks
  if (bookmarksArr.length >= 20){
    return {status: false, msg: 'Maximun bookmarks reached. \n Please remove a bookmark'}
  }
  //prevent duplicate bookmarks
  if (bookmarksArr.some(el => el.id === recipe.id)){
    return {status: false, msg: 'Duplicate Bookmark: Not Added'}
  }
  return {status: true, msg: "Added to Bookmarks!"}
}

//add a new recipe
export const createNewRecipe = async (recipeObj) => {
  //build new recipe object
    const {id, image, ingredients, prepTime, publisher, title, url, servings } = recipeObj;
    console.log(ingredients);
    
    const newRecipe = {
        id,
        title,
        servings,
        cooking_time: prepTime,
        ingredients,
        source_url: url,
        image_url: image,
        publisher
    };
    //send data with AJAX request to POST new recipe to our API
    const data = await AJAX(`${API_URL}?key=${KEY}`, newRecipe);
    return data
}






