import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const GET_ALL_RECIPES = gql`
  query getRecipesByUser($userId: ID!) {
  getRecipesByUser(userId: $userId) {
    label
    ingredientLines
    url
    image
  }
}
`;

export const GET_ALL_INGREDIENTS = gql`
  query GetAllIngredients {
    getAllIngredients {
      _id
      text
      quantity
      measure
      food
      weight
      
    }
  }
`;

export const GET_INGREDIENT_BY_ID = gql`
  query GetIngredientById($_id: ID!) {
    getIngredientById(_id: $_id) {
      _id
      text
      quantity
      measure
      food
      weight
      foodId
    }
  }
`;