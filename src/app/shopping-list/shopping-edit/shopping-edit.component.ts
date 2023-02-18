import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInpRef: ElementRef;
  @ViewChild('amountInput') amountInpRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}
  onAddItem() {
    this.shoppingListService.addIngredient({
      amount: Number(this.amountInpRef.nativeElement.value),
      name: this.nameInpRef.nativeElement.value,
    });
  }
}
