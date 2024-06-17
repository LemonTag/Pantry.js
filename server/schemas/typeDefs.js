const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
  }

  type Ingredient {
    _id: ID
    text: String
    quantity: Int
    measure: String
    food: String
    weight: Int
        
  }

  type Recipe {
    _id: ID
    label: String!
    image: String!
    url: String!
    ingredientLines: [String!]!
    createdAt:String
    userId: ID!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    getIngredientById(_id:ID):Ingredient
    getAllIngredients:[Ingredient]
    getRecipesByUser(userId: ID!): [Recipe]
    recipe(recipeId: ID!):Recipe
    searchRecipes(q: String!): [Recipe]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  
    addIngredient(food:String!, text: String, quantity:Int, measure:String, weight:Int): Ingredient
    
    updateIngredient(_id:ID!, food:String, text: String, quantity:Int, measure:String, weight:Int ) : Ingredient
    
    deleteIngredient(_id:ID!) :Ingredient
  
    addRecipe(userId: ID!, label: String!, image: String!, url: String!, ingredientLines: [String!]!): Recipe
    updateRecipe(_id: ID!, label: String, image: String, source: String, url: String, ingredientIds: [ID]): Recipe
    deleteRecipe(_id: ID!): Recipe
  }
`;

module.exports = typeDefs;
