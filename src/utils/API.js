import { API_URL } from "./config"
import axios from "axios";

//fetch array of recipeIDs that match searchTerm
export const getRecipeIDs = async function(searchTerm){

    try {
     const response = await axios.get(`${API_URL}?search=${searchTerm}`);
      //return first 25 results
      let recipeResults = response.data.data.recipes.slice(0, 25).map(recipe => {
        return {id: recipe.id, title: recipe.title, img: recipe.image_url }
      });
      return recipeResults
    } catch (err) {
      console.log(err);
      return err;
    }
 };

 //fetch singleRecipeData
 export const getSingleRecipeData = async function(recipeID){
    try {
      const response = await axios.get(`${API_URL}${recipeID}`);
      return response.data.data.recipe
      //setCurrent
    } catch (err) {
      //return APP Error
      console.log(err);
      throw new Error(`${err}:  No Results Found...`)
    }
 }