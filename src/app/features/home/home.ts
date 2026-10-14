import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  categories = [
    'Electronics',
    'Fashion',
    'Books',
    'Groceries'
  ];

  featuredProducts = [
    {
      name: 'iPhone 16',
      price: 89999
    },
    {
      name: 'Samsung TV',
      price: 54999
    },
    {
      name: 'Laptop',
      price: 69999
    }
  ];
}