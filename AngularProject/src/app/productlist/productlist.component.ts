import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table'; // Importing Table from PrimeNG
import { CommonModule } from '@angular/common';
import { Table } from 'primeng/table';
import { products } from '../models/products'; // Importing the products array

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [TableModule, CommonModule], // Import necessary PrimeNG modules
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductListTableComponent implements AfterViewInit {
  @ViewChild('dt') dt!: Table;  // Table reference

  products = products;  // The products array, you can change this to fetch from a service if required

  ngAfterViewInit() {
    console.log(this.products);  // Log the products array to check if it's loaded
  }

  // Global filter function
  filterGlobal(event: Event) {
    const inputElement = event.target as HTMLInputElement;  // Type assertion for input event
    this.dt.filterGlobal(inputElement.value, 'contains');  // Apply global filter on table
  }

  filterByColumn(event: Event, field: string) {
    const inputElement = event.target as HTMLInputElement;  // Type assertion for input event
    this.dt.filter(inputElement.value, field, 'contains');  // Apply filter on individual column
  }
}
