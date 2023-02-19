import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsUpdate = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 12),
    new Ingredient('Tomatos', 12),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(i: number) {
    return this.ingredients.slice()[i];
  }

  addIngredient(ing: Ingredient) {
    this.ingredients.push(ing);
    this.ingredientsUpdate.next(this.ingredients);
  }
  updateIngredient(index: number, ing: Ingredient) {
    this.ingredients[index] = ing;
    this.ingredientsUpdate.next(this.ingredients);
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsUpdate.next(this.ingredients.slice());
  }
}
