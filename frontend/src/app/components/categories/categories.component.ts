import { Component, OnInit } from '@angular/core';

export interface Categorie {
  name: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Categorie[] = [
    { name: 'Hardware' },
    { name: 'Software' },
    { name: 'Services' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
