import { API_URL } from "./config"
import axios from "axios";

//fetch basic recipe info that match searchTerm
export const getRecipeIDs = async function(searchTerm){
    try {
     const response = await axios.get(`${API_URL}?search=${searchTerm}`);
      let recipeResults = response.data.data.recipes.slice(0, 50).map(recipe => {
        return {id: recipe.id, title: recipe.title, img: recipe.image_url, publisher: recipe.publisher }
      });
      return recipeResults
    } catch (err) {
      console.log(err);
      return err;
    }
 };

 //fetch data for single recipe
 export const getSingleRecipeData = async function(recipeID){
    try {
      const response = await axios.get(`${API_URL}${recipeID}`);
      return response.data.data.recipe
      //setCurrent
    } catch (err) {
      //return APP Error
      throw new Error(`${err}:  No Results Found...`)
    }
 }