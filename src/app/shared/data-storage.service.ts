import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { child, Database, get, getDatabase, ref, set } from 'firebase/database';
import { firebaseApp, firebaseConfig as defaultConfig } from 'src/firebase';
import { AuthService } from '../auth/auth.service';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  database: Database;

  constructor(
    private http: HttpClient,
    private rService: RecipeService,
    private authService: AuthService
  ) {
    this.database = getDatabase(firebaseApp);
  }

  storeRecipes() {
    const recipes = this.rService.getRecipes();

    set(ref(this.database, 'recipes'), recipes);
    console.log('saving');

    // this.http
    //   .put(
    //     'https://ng-course-recipe-book-c9839-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
    //     recipes
    //   )
    //   .subscribe((r) => {
    //     console.log(r);
    //   });
  }

  loadRecipes() {
    const dbRef = ref(getDatabase());
    return from(get(child(dbRef, `recipes`))).pipe(
      map((response) => response.val()),
      map<Recipe[], any>((recipes) => {
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

    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    //     return this.http.get<Recipe[]>(
    //       'https://ng-course-recipe-book-c9839-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
    //       { params: new HttpParams().set('auth', user.token) }
    //     );
    //   }),
    //   map((recipes) => {
    //     return recipes.map((recipe) => {
    //       return {
    //         ...recipe,
    //         ingredients: recipe.ingredients ?? [],
    //       };
    //     });
    //   }),
    //   tap((data) => {
    //     this.rService.setRecipes(data);
    //   })
    // );
  }
}
