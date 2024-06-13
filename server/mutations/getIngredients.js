import { gql } from '@apollo/client';

export const GET_INGREDIENTS = gql`
  query GetIngredients {
    ingredients {
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
