import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable({ providedIn: "root" })
export class RecipeService {
  /* private recipes: Recipe[] = [
    new Recipe(
      "First recipe",
      "First description",
      "https://upload.wikimedia.org/wikipedia/commons/8/89/7126_-_Luzern_-_Chicken_%26_pasta.JPG",
      [
        new Ingredient("Tomatoes", 4),
        new Ingredient("Onions", 2),
        new Ingredient("Apples", 2)
      ]
    ),
    new Recipe(
      "Second recipe",
      "Second description",
      "https://upload.wikimedia.org/wikipedia/commons/8/89/7126_-_Luzern_-_Chicken_%26_pasta.JPG",
      [
        new Ingredient("Potatoes", 2),
        new Ingredient("Onions", 4),
        new Ingredient("Tomatoes", 3)
      ]
    )
  ]; */

  private recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToCart(ingredients: Ingredient[]) {
    this.slService.addIngredientsToCart(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
