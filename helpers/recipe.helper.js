import Recipe from "../models/Recipe.js"

const recipeHelper = {
    isRecipeExists: async(id) => {
        const recipe = await Recipe.findById(id);
        if(recipe) return true;
        return false;
    }
}

export default recipeHelper;