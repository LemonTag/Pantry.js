import { gql } from '@apollo/client';

export const ADD_INGREDIENT = gql`
  mutation AddIngredient($text: String!, $quantity: Float!, $measure: String!, $food: String!, $weight: Float!, $foodId: String!) {
    addIngredient(text: $text, quantity: $quantity, measure: $measure, food: $food, weight: $weight, foodId: $foodId) {
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
