import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm | undefined;

  subscription: Subscription | undefined;

  editMode: boolean = false;

  editItemIndex: number | any;

  editedItem: Ingredient | undefined;

  constructor(private shoppingListService: ShoppingListService) {}

  //====Start Life Cycle Hooks
  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editItemIndex = index;
        this.editedItem = this.shoppingListService.getIngrdient(index);
        this.slForm?.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  //====End Life Cycle Hooks

  //===Start Methods
  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addNewIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(): void {
    this.slForm?.reset();
    this.editMode = false;
  }

  onDeleteItem(): void {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editItemIndex);
    }
    this.editMode = false;
    this.slForm?.reset();
  }
  //===End Methods
}
