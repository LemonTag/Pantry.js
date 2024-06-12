const { User, Monster } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("monsters");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("monsters");
    },
    monsters: async () => {
      return Monster.find().sort({ name: 1 });
    },
    monster: async (parent, { monsterId }) => {
      return Monster.findOne({ _id: monsterId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("comments");
      }
      throw AuthenticationError;
    },
    searchRecipes: async (_, { q }) => {
      try {
        const response = await fetch(`https://api.edamam.com/search?q=${q}&app_id=e60d45ac&app_key=fcb5780894c4282cc330af20f9a037df`);

        if (!response.ok) {
          throw new Error('Failed to fetch recipes from Edamam');
        }

        const data = await response.json();

        // Parse the response and return the required data
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
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addMonster: async (parent, { monsterName, type, habitat, weaknesses }) => {
      const monster = await Monster.create({
        monsterName,
        type,
        habitat,
        weaknesses,
      });

      return monster;
    },
    addComment: async (parent, { monsterId, commentText }, context) => {
      if (context.user) {
        return Monster.findOneAndUpdate(
          { _id: monsterId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeMonster: async (parent, { monsterId }, context) => {
      const monster = await Monster.findOneAndDelete({
        _id: monsterId,
      });

      return monster;
    },
    removeComment: async (parent, { monsterId, commentId }, context) => {
      if (context.user) {
        return Monster.findOneAndUpdate(
          { _id: monsterId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    updateComment: async (parent, { monsterId, commentId, commentText }) => {
      return Monster.findOneAndUpdate(
        { _id: monsterId, "comments._id": commentId },
        { $set: { "comments.$.commentText": commentText } },
        { new: true }
      );
    },
    updateMonster: async (
      parent,
      { monsterId, monsterName, type, habitat, weaknesses }
    ) => {
      const updateFields = {};
      if (monsterName) updateFields.monsterName = monsterName;
      if (type) updateFields.type = type;
      if (habitat) updateFields.habitat = habitat;
      if (weaknesses) updateFields.weaknesses = weaknesses;

      return Monster.findOneAndUpdate(
        { _id: monsterId },
        { $set: updateFields },
        { new: true }
      );
    },

    addIngredient: async (parent, { text, quantity, measure, food, weight, foodId }) => {
      const ingredient = await Ingredient.create({
        text,
        quantity,
        measure,
        food,
        weight,
        foodId,
      });
      return ingredient;
    },

    updateIngredient: async (parent, { _id, text, quantity, measure, food, weight, foodId }) => {
      const updateFields = {};
      if (text) updateFields.text = text;
      if (quantity !== undefined) updateFields.quantity = quantity;
      if (measure) updateFields.measure = measure;
      if (food) updateFields.food = food;
      if (weight !== undefined) updateFields.weight = weight;
      if (foodId) updateFields.foodId = foodId;

      const updatedIngredient = await Ingredient.findOneAndUpdate(
        { _id: _id },
        { $set: updateFields },
        { new: true }
      );
      return updatedIngredient;
    },

    deleteIngredient: async (parent, { _id }) => {
      const deletedIngredient = await Ingredient.findOneAndDelete({ _id: _id });
      return deletedIngredient;
    },
  
    addRecipe: async(_,{label,image,instructions,url,ingredientIds})=>{
      const recipe= await Recipe.create({
        label,
        image,
        instructions,
        url,

      });
      if (ingredientIds && ingredientIds.length > 0) {
        const ingredients = await Ingredient.find({ _id: { $in: ingredientIds } });
        recipe.ingredients = ingredients.map(ingredient => ingredient._id);
        await recipe.save();
      }
        return recipe;
    }, 

    updateRecipe: async (_, { _id, label, image, instructions, url, ingredientIds }) => {
      const updateFields = {};
      if (label) updateFields.label = label;
      if (image) updateFields.image = image;
      if (instructions) updateFields.instructions = instructions;
      if (url) updateFields.url = url;
      if (ingredientIds) updateFields.ingredients = ingredientIds;

      return Recipe.findOneAndUpdate(
        { _id: _id },
        { $set: updateFields },
        { new: true }
      );
    },
    
    deleteRecipe: async (_, { _id }) => {
      const recipe = await Recipe.findOneAndDelete({
        _id: _id,
      });
      return recipe
    }
   
  },

};

module.exports = resolvers;
