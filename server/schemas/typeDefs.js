const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Ingredient {
    _id: ID
    text: String!
    quantity: String!
    measure: String!
    food: String!
    weight: String!
    foodId: String!
  }

  type Recipe {
    _id: ID
    label: String!
    image: String!
    url: String!
    ingredients:[Ingredient!]!
    createdAt:String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    
    me: User
    recipes:[Recipe]
    recipe(recipeId: ID!):Recipe
    searchRecipes(q: String!): [Recipe]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  
    addIngredient(ingredientName: String!) : Ingredient
    updateIngredient(_id:ID!, ingredientName: String!) : Ingredient
    deleteIngredient(_id:ID!) :Ingredient
  
    addRecipe(label: String!, image: String, source: String, url: String, ingredientIds: [ID]): Recipe
    updateRecipe(_id: ID!, label: String, image: String, source: String, url: String, ingredientIds: [ID]): Recipe
    deleteRecipe(_id: ID!): Recipe
  }
`;

module.exports = typeDefs;
