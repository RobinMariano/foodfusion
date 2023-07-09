import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  /*@ViewChild('searchbar', {static: true}) searchbar:  ElementRef | null = null;
  results: string[] = [];
  showResults = false;
  rawIngredients: string[] = [
    'Onion', 'Garlic', 'Potato', 'Cabbage', 'Carrots','Egg', 'Butter'
  ];
  rawCondiments: string[] = [
    'Oyster Sauce', 'Soy Sauce', 'Vinegar', 'Mustard', 'Mayonnaise'
  ];*/

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

  limitInput(event: any, ingredient: string) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;
  
    // Remove any non-digit characters
    const sanitizedValue = inputValue.replace(/\D/g, '');
  
    // Limit the value to 3 digits
    const limitedValue = sanitizedValue.slice(0, 3);
  
    // Update the selected quantity for the specific ingredient
    this.selectedQuantities[ingredient] = limitedValue;
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
  
}