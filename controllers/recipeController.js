const axios = require("axios");
const User = require("../models/userSchema");

const recipeList = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`,
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );

    const recipes = response.data.results.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      sourceUrl: `https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`,
    }));

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};

const searchRecipeByIngredient = async (req, res) => {
  const { ingredient } = req.query;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients`,
      {
        params: {
          ingredients: ingredient,
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );

    const searchRecipe = response?.data?.map((recipe) => ({
      title: recipe?.title,
      image: recipe?.image,
      usedIngredients: recipe?.usedIngredients,
    }));

    res.json(searchRecipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to search recipes" });
  }
};

const getFavoriteRecipes = async (req, res) => {
  const { id } = req.body;
  
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const favoriteRecipe = async (req, res) => {
  const { id, recipeId, recipeDetails } = req.body;
  console.log("recipeDetails", recipeDetails, recipeId);

  try {
    const user = await User.findById(id);
    user.favorites.push({ recipeId, recipeDetails });
    await user.save();
    res.status(200).json({ message: "Recipe added to favorites" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteFavorite = async (req, res) => {
  const { recipeId } = req.params;
  try {
    const user = await User.findById(req.user);
    user.favorites = user.favorites.filter((fav) => fav.recipeId !== recipeId);
    await user.save();
    res.status(200).json({ message: "Recipe removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  recipeList,
  searchRecipeByIngredient,
  favoriteRecipe,
  deleteFavorite,
  getFavoriteRecipes,
};
