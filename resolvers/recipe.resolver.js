import recipeHelper from "../helpers/recipe.helper.js";
import Recipe from "../models/Recipe.js";
import throwCustomError, { ErrorTypes } from "../helpers/errorHandler.js";

const recipeResolver = {
    Query: {
        getRecipies: async (_, { amount }) => {
            const allRecipes = await Recipe.find().limit(amount);
            return allRecipes;
        },
        recipe: async (_, args) => {
            try {
                const recipe = await Recipe.findById(args.id);
                return {
                    _id: recipe._id,
                    ...recipe._doc,
                };
            } catch (error) {
                throwCustomError(
                    `Recipe with id ${id} doesn't exist`,
                    ErrorTypes.NOT_FOUND
                );
            }
        },
    },
    Mutation: {
        createRecipe: async (_, args) => {
            const { name, desc } = args.input;
            const newRecipe = new Recipe({
                name,
                desc,
                createdAt: new Date().toString(),
                like: 0,
                dislike: 0,
            });
            const res = await newRecipe.save();
            return {
                _id: res.id,
                ...res._doc,
            }
        },
        updateRecipe: async (_, args) => {
            const {id}  = args;
            const {name, desc}  = args.input;
            const isExist = await recipeHelper.isRecipeExists(id);
            if(!isExist) {
                throwCustomError(`Recipe with id ${id} doesn't exist`, ErrorTypes.NOT_FOUND);
            }
            const isUpdated = (await Recipe.updateOne({_id: id}, {name: name, desc: desc})).modifiedCount;
            return {
                isSuccess: isUpdated,       // return 1 if updated
                message: 'Edited Successfully',
            }
        },
        deleteRecipe: async (_, args) => {
            const {id}  = args;
            const isExist = await recipeHelper.isRecipeExists(id);
            if(!isExist) {
                throwCustomError(`Recipe with id ${id} doesn't exist`, ErrorTypes.NOT_FOUND);
            }
            const isDeleted = (await Recipe.deleteOne({_id: id})).deletedCount;
            return {
                isSuccess: isDeleted,
                message: 'Deleted Successfully',
            }
        },
        incrLike: async (_, args) => {
            const {id}  = args;
            const isExist = await recipeHelper.isRecipeExists(id);
            if(!isExist) {
                throwCustomError(`Recipe with id ${id} doesn't exist`, ErrorTypes.NOT_FOUND);
            }
            await Recipe.updateOne({_id: id}, { $inc: {like: 1} }, {new : true});
            return {
                isSuccess: true,
                message: 'Like incremented'
            }
        },
        incrDislike: async (_, args) => {
            const {id}  = args;
            const isExist = await recipeHelper.isRecipeExists(id);
            if(!isExist) {
                throwCustomError(`Recipe with id ${id} doesn't exist`, ErrorTypes.NOT_FOUND);
            }
            await Recipe.updateOne({_id: id}, { $inc: {dislike: 1} }, {new : true});
            return {
                isSuccess: true,
                message: 'Dislike incremented'
            }
        },
    },
};

export default recipeResolver;
