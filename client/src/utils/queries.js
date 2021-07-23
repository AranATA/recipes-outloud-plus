import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      firstName
      lastName 
      username
      email
      recipeCount
      savedRecipes {
        recipeId
        image
        title
      }
    }
  }
`;

export const QUERY_RECIPES = gql`
  query getSavedRecipes {
    savedRecipes {
    _id
    recipeId
    image
    title
    userNotes
    }
  }
  `;

export const QUERY_SINGLE_RECIPE = gql`
  query getSavedRecipe($savedRecipeId: ID!) {
    savedRecipe(savedRecipeId: $savedRecipeId) {
      _id
      recipeId
      image
      title
      userNotes {
        _id
        userNoteText
        userNoteAuthor
        createdAt
      }  
    }
  }
`;

export const GET_ME = gql`
  query me {
    me {
       _id
      firstName
      lastName 
      username
      email
      recipeCount
      savedRecipes {
        recipeId
        image
        title
      }
    }
  }
`;