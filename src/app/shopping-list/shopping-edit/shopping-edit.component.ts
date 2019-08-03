import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editingSubscription: Subscription;
  editMode: boolean = false;
  editingItemIndex: number;
  editingItem: Ingredient;
  @ViewChild("f", { static: false }) slForm: NgForm;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.editingSubscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editingItemIndex = index;
        this.editMode = true;
        this.editingItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editingItem.name,
          amount: this.editingItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editingItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.slService.deleteIngredient(this.editingItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.editingSubscription.unsubscribe();
  }
}
