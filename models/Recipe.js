import mongoose from 'mongoose'

const recipeSchema = mongoose.Schema({
    name: { type: String, required: true},
    desc: { type: String, required: true},
    createdAt: { type: String},
    like: { type: Number},
    dislike: { type: Number }
}, {timestamps: true})

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;