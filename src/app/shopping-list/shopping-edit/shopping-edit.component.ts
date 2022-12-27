import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { Ingredient } from './../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInpRef: ElementRef;
  @ViewChild('amountInput') amountInpRef: ElementRef;
  @Output() addItem = new EventEmitter<Ingredient>();

  constructor() {}

  ngOnInit(): void {}
  onAddItem() {
    this.addItem.emit({
      amount: Number(this.amountInpRef.nativeElement.value),
      name: this.nameInpRef.nativeElement.value,
    });
  }
}
