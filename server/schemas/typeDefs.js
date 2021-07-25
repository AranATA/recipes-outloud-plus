const { gql } = require ('apollo-server-express');

const typeDefs = gql`
  
type User {
    _id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    recipeCount: Int
    savedRecipes: [Recipe]    
  }

  type Recipe {
    _id: ID!
    recipeId: Int!
    image: String!
    title: String!
    userNotes: [userNote]
  }

  type userNote {
    _id: ID
    userNoteText: String
    userNoteAuthor: String
    createdAt: String
  }

  input RecipeInput {
    recipeId: Int!
    image: String!
    title: String!
    
  } 

  type Auth {
    token: ID!
    user: User 
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    savedRecipes(username: String!): [Recipe]
    savedRecipe(savedRecipeId: ID!): Recipe
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String!, email: String! password: String!): Auth

    signIn(email: String!, password: String!): Auth

    saveRecipe(input: RecipeInput): User

    addUserNote(recipeId: Int!, userNoteText: String!): Recipe 

    removeRecipe(recipeId: Int!): User

    removeUserNote(recipeId: Int!, userNoteId: ID!): Recipe
  }
  `;
  module.exports = typeDefs;