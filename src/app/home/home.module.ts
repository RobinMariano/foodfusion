import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private router: Router,
    private dataService: DataService,
    private firestore: Firestore
  ) {}

  onSubmit() {
    const recipeData = {
      recipeName: this.recipeName,
      description: this.description,
      ingredients: this.selectedIngredients,
      cookingProcedure: this.cookingProcedure,
      Qty: this.selectedQuantities,
      Unit: this.selectedMeasurements,
      imageFile: this.recipe.imageFile
    };

    // Call the registerRecipe method from the DataService and pass the recipe data
    this.dataService.registerRecipe(recipeData)
      .then(() => {
        // Recipe registration successful
        console.log('Recipe registered successfully!');
      })
      .catch(error => {
        // Handle any errors that occurred during recipe registration
        console.error('Error registering recipe:', error);
      });
  }

  selectedIngredients: string[] = [];
  selectedQuantities: { [key: string]: string } = {};
  selectedMeasurements: { [key: string]: string } = {};

  recipeName: string = '';
  description: string = '';
  cookingProcedure: string = '';
  newIngredient: string = '';

  recipe = {
    recipeName: '',
    description: '',
    ingredientAdded: '',
    cookingProcedure: '',
    imageFile: null
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    
  }

  addIngredient() {
    const ingredient = this.newIngredient.trim();

    if (ingredient && !this.selectedIngredients.includes(ingredient)) {
      this.selectedIngredients.push(ingredient);
    }

    this.newIngredient = '';
  }

  deleteIngredient(ingredient: string) {
    const index = this.selectedIngredients.indexOf(ingredient);
    if (index > -1) {
      this.selectedIngredients.splice(index, 1);
      this.selectedQuantities[ingredient] = ''; // Reset the quantity value
      this.selectedMeasurements[ingredient] = ''; // Reset the measurement value
    }
  }

  adjustTextareaHeight(event: any) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  gotoSearchbar() {
    this.router.navigate(['/search-bar']); //href
  }

  validateQuantity(event: any, ingredient: string) {
    const input = event.target.value;
    if (input && input.length > 3) {
      event.target.value = input.slice(0, 3);
      this.selectedQuantities[ingredient] = event.target.value;
    }
  }

  async saveRecipe(recipeData: any) {
    try {
      const recipeRef = collection(this.firestore, 'recipes');
      await addDoc(recipeRef, recipeData);

      // Clear form fields after saving
      this.recipeName = '';
      this.description = '';
      this.selectedIngredients = [];
      this.cookingProcedure = '';
      this.fileInput.nativeElement.value = null; // Reset file input value


      console.log('Recipe saved successfully!');
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  }
}
