const express = require("express");
const { body } = require("express-validator");
const {
  recipeList,
  deleteFavorite,
  getFavoriteRecipes,
} = require("../controllers/recipeController");
const router = express.Router();
const { authenticate } = require("../middleware/jwt");
const { searchRecipeByIngredient } = require("../controllers/recipeController");
const { favoriteRecipe } = require("../controllers/recipeController");

router.get("/", authenticate, recipeList);
router.get("/search", authenticate, searchRecipeByIngredient);
router.post("/favorite", authenticate, favoriteRecipe);
router.delete("/favorite/:recipeId", authenticate, deleteFavorite);
router.post("/allfavorites", authenticate, getFavoriteRecipes);

module.exports = router;
