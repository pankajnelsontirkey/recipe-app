import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  URL: string = "https://recipe-app-97573.firebaseio.com/";
  DB: string = "recipes";

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(`${this.URL}\\${this.DB}.json`, recipes)
      .subscribe(response => {
        console.log(response);
      });
  }
}
