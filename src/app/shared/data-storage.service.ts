import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private rService: RecipeService) {}

  storeRecipes() {
    const recipes = this.rService.getRecipes();
    this.http
      .put(
        'https://ng-course-recipe-book-c9839-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((r) => {
        console.log(r);
      });
  }

  loadRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-c9839-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ?? [],
            };
          });
        }),
        tap((data) => {
          this.rService.setRecipes(data);
        })
      );
  }
}
