const { User, Recipe, Ingredient } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require('apollo-server-express'); // Updated import

const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      if (!context.user) throw new AuthenticationError('You must be logged in');
      return User.find().populate("monsters");
    },
    user: async (parent, { username }, context) => {
      if (!context.user) throw new AuthenticationError('You must be logged in');
      return User.findOne({ username }).populate("monsters");
    },
    me: async (parent, args, context) => {
      if (!context.user) throw new AuthenticationError('You must be logged in');
      return User.findOne({ _id: context.user._id }).populate("comments");
    },
    searchRecipes: async (parent, { q }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to search recipes');
      }
    
      try {
        const response = await fetch(`https://api.edamam.com/search?q=${q}&app_id=e60d45ac&app_key=fcb5780894c4282cc330af20f9a037df`);
    
        if (!response.ok) {
          throw new Error('Failed to fetch recipes from Edamam');
        }
    
        const data = await response.json();
    
        const recipes = data.hits.map(hit => ({
          label: hit.recipe.label,
          image: hit.recipe.image,
          url: hit.recipe.url,
          ingredients: hit.recipe.ingredients,
        }));
    
        return recipes;
      } catch (error) {
        console.error('Error fetching recipes from Edamam:', error);
        throw new Error('Failed to fetch recipes from Edamam');
      }
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addIngredient: async (parent, { food, text, quantity, measure, weight  }, context) => {
      // if (!context.user) throw new AuthenticationError('You must be logged in');
      console.log(food)
      const ingredient =  new Ingredient({ food, text, quantity, measure, weight });
      await ingredient.save()
      return ingredient;
    },

    updateIngredient: async (parent, args, context) => {
      if (!context.user) throw new AuthenticationError('You must be logged in');
      const updateFields = { ...args };
      const updatedIngredient = await Ingredient.findOneAndUpdate(
        { _id: args._id },
        { $set: updateFields },
        { new: true }
      );
      return updatedIngredient;
    },

    deleteIngredient: async (parent, { _id }, context) => {
      if (!context.user) throw new AuthenticationError('You must be logged in');
      const deletedIngredient = await Ingredient.findOneAndDelete({ _id });
      return deletedIngredient;
    },

    addRecipe: async (parent, args, context) => {
      if (!context.user) throw new AuthenticationError('You must be logged in');
      const recipe = await Recipe.create(args);
      if (args.ingredientIds && args.ingredientIds.length > 0) {
        const ingredients = await Ingredient.find({ _id: { $in: args.ingredientIds } });
        recipe.ingredients = ingredients.map(ingredient => ingredient._id);
        await recipe.save();
      }
      return {
        label: recipe.label,
        image: recipe.image,
        url: recipe.url,
        ingredientLines: recipe.ingredientLines,
      };
    },

    updateRecipe: async (parent, args, context) => {
      if (!context.user) throw new AuthenticationError('You must be logged in');
      const updateFields = { ...args };
      return Recipe.findOneAndUpdate(
        { _id: args._id },
        { $set: updateFields },
        { new: true }
      );
    },

    deleteRecipe: async (parent, { _id }, context) => {
      if (!context.user) throw new AuthenticationError('You must be logged in');
      const recipe = await Recipe.findOneAndDelete({ _id });
      return recipe;
    },
  },
};

module.exports = resolvers;

