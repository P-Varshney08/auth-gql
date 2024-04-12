import gql from "graphql-tag";

export const recipeTypeDef = gql`
    type Recipe {
        _id: ID!
        name: String!
        desc: String!
        createdAt: String
        like: Int
        dislike: Int
    }
    type RecipeSucess{
        isSuccess: Boolean
        message: String!
    }
    type Query {
        getRecipies(amount: Int): [Recipe]
        recipe(id: ID!): Recipe!
    }
    input RecipeInput{
        name: String!
        desc: String!
    }
    type Mutation{
        createRecipe(input: RecipeInput): Recipe!
        updateRecipe(id: ID!, input: RecipeInput): RecipeSucess
        deleteRecipe(id: ID!): RecipeSucess
        incrLike(id: ID!): RecipeSucess
        incrDislike(id: ID!): RecipeSucess
    }   
`
