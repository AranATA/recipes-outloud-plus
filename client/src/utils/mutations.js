import { gql } from '@apollo/client';


export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
    ) {
      addUser(
        firstName: $firstName
        lastName: $lastName
        username: $username
        email: $email
        password: $password
      ) {
      token
      user {
        _id
        firstName
        lastName
        username
        email
      }
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
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
          userNotes {
            userNoteText
            userNoteAuthor
            createdAt
          }
        }
      }
    }
  }
`;


export const SAVE_RECIPE = gql`
  mutation saveRecipe($input: RecipeInput!) {
    saveRecipe(input: $input) {
      _id
      username
      email
      savedRecipes {
        recipeId
        image
        title
        userNotes {
          userNoteText
          userNoteAuthor
          createdAt
        }  
      }
    }
  }
`;

export const ADD_USER_NOTE = gql`
  mutation addUserNote($recipeId: Int!, $userNoteText: String!) {
    addUserNote(recipeId: $recipeId, userNoteText: $userNoteText) {
      _id
      recipeId
      image
      title
      userNotes {
        userNoteText
        userNoteAuthor
        createdAt
      }
    }
  }
  `;

export const REMOVE_RECIPE = gql`
  mutation removeRecipe($recipeId: Int!) {
    removeRecipe(recipeId: $recipeId){
      _id
      username
      email
      savedRecipes {
        recipeId
        image
        title
      }
    }
  }
`;

export const REMOVE_USER_NOTE = gql`
  mutation removeUserNote($recipeId: Int!,$userNoteId: ID!) {
    removeUserNote(recipeId: $recipeId, userNoteId: $userNoteId) {
      _id
      username
      email
      savedRecipes {
        recipeId
        image
        title
      }
    }
  }
`;