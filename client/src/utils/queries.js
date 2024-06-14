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

export const QUERY_MONSTERS = gql`
  query getMonsters {
    monsters {
      _id
      monsterName
      type
      habitat
      weaknesses
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_SINGLE_MONSTER = gql`
  query getSingleMonster($monsterId: ID!) {
    monster(monsterId: $monsterId) {
      _id
      monsterName
      type
      habitat
      weaknesses
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
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
  query getAllRecipes {
    getAllRecipes {
      _id
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