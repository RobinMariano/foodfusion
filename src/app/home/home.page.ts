import { Component, ElementRef, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(private router: Router) {}


  selectedIngredients: string[] = [];
  selectedQuantities: { [key: string]: string } = {};
  selectedMeasurements: { [key: string]: string } = {};
  

  newIngredient: string = '';

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

  cookingProcedure: string = '';
  description: string = '';

  adjustTextareaHeight(event: any) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  } 
    
  gotoSearchbar(){
    this.router.navigate(['/search-bar']) //href
  }
  
  validateQuantity(event: any, ingredient: string) {
    const input = event.target.value;
    if (input && input.length > 3) {
      event.target.value = input.slice(0, 3);
      this.selectedQuantities[ingredient] = event.target.value;
    }
  }

  recipe = {
    recipeName: '',
    description: '',
    ingredientAdded: '',
    cookingProcedure: '',
    imageFile: null


  };

  onFileSelected(event: any) {
    this.recipe.imageFile = event.target.files[0];
  }

  submitRecipe() {
    // Perform the upload logic here
    // Access the recipe properties: this.recipe.title, this.recipe.description, this.recipe.imageFile
    // You can use HttpClient or any other method for uploading the image file
    console.log('Recipe:', this.recipe);
  }
}
