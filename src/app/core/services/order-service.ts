import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  placeOrder(
    order: unknown
  ): void {

    console.log(order);
  }

  getOrders(): void {

    console.log('Orders');
  }

  getOrder(
    id: number
  ): void {

    console.log(id);
  }

  cancelOrder(
    id: number
  ): void {

    console.log(id);
  }

  trackOrder(
    id: number
  ): void {

    console.log(id);
  }
}