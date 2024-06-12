const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// Route to fetch recipes by ingredients
router.get('/cookbooks', async (req, res) => {
  const ingredientIds = req.query.ingredients.split(',');

  try {
    // Find recipes that contain any of the specified ingredients
    const cookbooks = await Recipe.find({ Ingredients: { $in: ingredientIds } });

    res.json(cookbooks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
});

module.exports = router;
