import gql from "graphql-tag";

export const userTypeDef = gql`
    scalar DateTime

    type User {
        _id: ID!
        email: String!
        username: String!
        password: String
        createdAt: DateTime
        updatedAt: DateTime
        recipe: [String!]
    }
    type userWithToken {
        userId: ID!
        email: String!
        password: String
        createdAt: DateTime
        like: Int
        dislike: Int
        userJwtToken: JwtToken!
    }
    type JwtToken {
        token: String!
    }
    input signinInput {
        email: String!
        password: String!
    }
    input signupInput {
        email: String!
        password: String!
        username: String!
    }
    type Mutation {
        signup(input: signupInput): userWithToken 
        signin(input: signinInput): userWithToken 
    }
    type Query {
        getUsers: [User]
        getUser(id:ID!): User!
    }

`