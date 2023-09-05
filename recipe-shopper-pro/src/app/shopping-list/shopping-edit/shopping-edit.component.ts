import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('inputName') inputName: ElementRef | undefined;

  @ViewChild('inputNumber') inputNumber: ElementRef | undefined;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {}

  addIngredient() {
    this.shoppingListService.addNewIngredient(
      new Ingredient(
        this.inputName?.nativeElement.value,
        this.inputNumber?.nativeElement.value
      )
    );
  }
}
