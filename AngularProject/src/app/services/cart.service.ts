import { HttpClient } from '@angular/common/http';
import { Product } from '../models/products';
import { Injectable, inject, signal } from '@angular/core';
import { ShippingPrice } from '../models/shippingPrice';

@Injectable({
  providedIn: 'root' // This service is provided in the root injector for your app and should be available globally.
})
export class CartService {
  private http = inject(HttpClient); // Inject HttpClient to make HTTP requests.
  items: {id: number; name: string; price: number; description: string; category: string; image: string; quantity: number}[] = []; // Array to hold the items in the cart.
  cartCount = signal<number>(0); //use signal to create a reactive variable

  // Method to add a product to the cart.
  addToCart(product: Product) {
    // Check if the product already exists in the cart
    const existingProduct = this.items.find((item) => item.id === product.id);

    if (existingProduct) {
      // If it exists, increment the quantity
      existingProduct.quantity += 1;
    } else {
      // If not, add the product to the cart with an initial quantity of 1
      this.items.push({ ...product, quantity: 1 });
    }

    this.updateCartCount(); // Update the cart count signal.
  }
  removeFromCart(product: Product) {
    const existingProduct = this.items.find((item) => item.id === product.id);

    if (existingProduct && existingProduct.quantity > 0) {
      existingProduct.quantity -= 1;
    }

    if (existingProduct && existingProduct.quantity === 0) {
      // If the quantity reaches 0, remove the product from the cart
      this.items = this.items.filter((item) => item.id !== product.id);
    }

    this.updateCartCount();
  }

  updateCartCount() {
    // Sum all quantities from the cart
    const totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCount.set(totalQuantity); // Update the signal value
  }

  // Get the quantity of a product in the cart
  getProductQuantity(product: Product): number {
    const existingProduct = this.items.find(item => item.id === product.id);
    return existingProduct ? existingProduct.quantity : 0;
  }

  // Method to get the items in the cart.
  getItems() {
    return this.items;
  }

  // Method to clear the cart.
  clearCart() {
    this.items = []; // Empty the items array.
    this.cartCount.set(0); // clear the cart count signal.
    return this.items;
  }

  // Method to get the shipping prices from a JSON file.
  getShippingPrices() {
    return this.http.get<ShippingPrice[]>('./assets/shipping.json');
  }

  // Method to get the subtotal of the items in the cart.
  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.price*item.quantity , 0); // Use reduce to sum up the prices of the items in the cart.
  }
}
