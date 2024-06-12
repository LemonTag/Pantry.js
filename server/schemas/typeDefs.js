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

  type Instructions {
    _id: ID
    instructions: String!
  }

  type Recipe {
    _id: ID
    label: String!
    image: String!
    instructions: String!
    url: String!
    ingredients:[Ingredient!]!
    createdAt:String!
  }

  type Monster {
    _id: ID
    monsterName: String!
    type: String!
    habitat: String!
    weaknesses: [String]!
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    monsters(username: String): [Monster]
    monster(monsterId: ID!): Monster
    me: User
    recipes:[Recipe]
    recipe(recipeId: ID!):Recipe
    searchRecipes(q: String!): [Recipe]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addMonster(monsterName: String!, type: String!, habitat: String!, weaknesses: [String]!): Monster
    updateMonster(monsterId: ID!, monsterName: String, type: String, habitat: String, weaknesses: [String]): Monster # Colon added here
    removeMonster(monsterId: ID!): Monster
    addComment(monsterId: ID!, commentText: String!): Monster
    updateComment(monsterId: ID!, commentId: ID!, commentText: String!): Monster
    removeComment(monsterId: ID!, commentId: ID!): Monster
  
    addIngredient(ingredientName: String!) : Ingredient
    updateIngredient(_id:ID!, ingredientName: String!) : Ingredient
    deleteIngredient(_id:ID!) :Ingredient
  
    addRecipe(label: String!, image: String, source: String, url: String, ingredientIds: [ID]): Recipe
    updateRecipe(_id: ID!, label: String, image: String, source: String, url: String, ingredientIds: [ID]): Recipe
    deleteRecipe(_id: ID!): Recipe
  }
`;

module.exports = typeDefs;
