import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  processPayment(
    payload: unknown
  ): void {

    console.log(payload);
  }

  getPaymentStatus(
    paymentId: string
  ): void {

    console.log(paymentId);
  }

  refund(
    paymentId: string
  ): void {

    console.log(paymentId);
  }
}