import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_INGREDIENT = gql`
  mutation addIngredient(
    $food: String!
    $text: String
    $quantity: Int
    $measure: String
    $weight: Int
  ) {
    addIngredient(
      food: $food
      text: $text
      quantity: $quantity
      measure: $measure
      weight: $weight
    ) {
      text
      quantity
      measure
      food
      weight
    }
  }
`;

export const UPDATE_INGREDIENT = gql`
  mutation updateIngredient(
    $_id: ID!,
    $food: String,
    $text: String,
    $quantity: Int,
    $measure: String,
    $weight: Int
  ) {
    updateIngredient(
      _id: $_id,
      food: $food,
      text: $text,
      quantity: $quantity,
      measure: $measure,
      weight: $weight
    ) {
      _id
      food
      text
      quantity
      measure
      weight
    }
  }
`;

export const DELETE_INGREDIENT = gql`
  mutation deleteIngredient($_id: ID!) {
    deleteIngredient(_id: $_id) {
      _id
      food
      quantity
      measure
      weight
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation addRecipe(
    $label: String!
    $image: String!
    $url: String!
    $ingredientLines: [String!]!
  ) {
    addRecipe(
      label: $label
      image: $image
      url: $url
      ingredientLines: $ingredientLines
    ) {
      label
      image
      url
      ingredientLines
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(_id: $id) {
      _id
    }
  }
`;
