/**import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

} **/
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild('searchbar', {static: true}) searchbar:  ElementRef | null = null;
  results: string[] = [];
  showResults = false;
  rawIngredients: string[] = [
    'Onion', 'Garlic', 'Potato', 'Cabbage', 'Carrots','Egg', 'Butter'
  ];
  rawCondiments: string[] = [
    'Oyster Sauce', 'Soy Sauce', 'Vinegar', 'Mustard', 'Mayonnaise'
  ];


  selectedIngredients: string[] = [];
  selectedQuantities: { [key: string]: string } = {};
  selectedMeasurements: { [key: string]: string } = {};
  selectedCondiments: string[] = [];

  
  constructor(private toastController: ToastController) {}
  


  async showToast() {
    const toast = await this.toastController.create({
      message: 'Registered recipe added successfully',
      duration: 2000
    });
    toast.present();
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = [...this.rawIngredients.filter((item: string) =>
      item.toLowerCase().includes(query)
    ), ...this.rawCondiments.filter((item: string) =>
    item.toLowerCase().includes(query)
  )];
    this.showResults = true;
  }

  selectResult(event: any, result: string) {
    event.stopPropagation();
    
    const isIngredient = this.rawIngredients.includes(result);

    if(isIngredient) {
      if (!this.selectedIngredients.includes(result)) {
        this.selectedIngredients.push(result);
        this.selectedIngredients.sort(); // Sort the selectedIngredients array
  
    }

   }  else {
      if (!this.selectedCondiments.includes(result)) {
        this.selectedCondiments.push(result);
        this.selectedCondiments.sort(); // Sort the selectedCondiments array
    }
  }
    this.showResults = false;
  }

    deleteIngredient(ingredient: string) {
      const index = this.selectedIngredients.indexOf(ingredient);
      if (index > -1) {
        this.selectedIngredients.splice(index, 1);
      }
    }

    deleteCondiment(condiments: string) {
      const index = this.selectedCondiments.indexOf(condiments);
      if (index > -1) {
        this.selectedCondiments.splice(index, 1);
      }
    }
    
@HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const isClickedInside = this.searchbar?.nativeElement?.contains(event.target);
    if (!isClickedInside) {
      this.showResults = false;
      
    }
  }
}