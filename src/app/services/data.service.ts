import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }
 
  registerRecipe(recipeData: any) {
    const recipesRef = collection(this.firestore, 'recipes'); // Assuming 'recipes' is the name of the collection in Firestore
    return addDoc(recipesRef, recipeData,);
  }
}