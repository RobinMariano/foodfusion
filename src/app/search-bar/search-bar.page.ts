import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.page.html',
  styleUrls: ['./search-bar.page.scss'],
})
export class SearchBarPage implements OnInit {


  public results: string[] = [];
  public showResults = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  addNewRecipe() {
    this.router.navigate(['/home']);
  }

  clickResult() {
    this.router.navigate(['/ingredient-info']);
  }
}
