import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  log(
    message: string,
    data?: unknown
  ): void {

    console.log(message, data);
  }

  warn(
    message: string,
    data?: unknown
  ): void {

    console.warn(message, data);
  }

  error(
    message: string,
    error?: unknown
  ): void {

    console.error(message, error);
  }

  info(
    message: string,
    data?: unknown
  ): void {

    console.info(message, data);
  }
}
