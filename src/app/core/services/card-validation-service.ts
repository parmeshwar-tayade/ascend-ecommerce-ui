import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardValidationService {

  validateCardNumber(
    cardNumber: string
  ): boolean {

    return /^\d{16}$/.test(cardNumber);
  }

  validateExpiryDate(
    expiryDate: string
  ): boolean {

    return expiryDate.length > 0;
  }

  validateCvv(
    cvv: string
  ): boolean {

    return /^\d{3}$/.test(cvv);
  }

  validateCard(
    cardNumber: string,
    expiryDate: string,
    cvv: string
  ): boolean {

    return (
      this.validateCardNumber(cardNumber) &&
      this.validateExpiryDate(expiryDate) &&
      this.validateCvv(cvv)
    );
  }
}