import {
  Component,
  computed,
  inject
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  searchText = '';

  cartCount = 2;

  readonly currentUser =
    this.authService.currentUser;

  readonly isLoggedIn =
    computed(() => !!this.currentUser());

  readonly isAdmin =
    computed(() =>
      this.authService.hasRole('ADMIN')
    );

  readonly isCustomer =
    computed(() =>
      this.authService.hasRole('CUSTOMER')
    );

  readonly userName =
    computed(() => {

      const user = this.currentUser();

      if (!user) {
        return '';
      }

      return `${user.firstName} ${user.lastName}`;

    });

  readonly userInitials =
    computed(() => {

      const user = this.currentUser();

      if (!user) {
        console.log('No user is currently logged in.');
        return '';
      }

      return (
        user.firstName.charAt(0) +
        user.lastName.charAt(0)
      ).toUpperCase();

    });

  onInit(): void {
    console.log(this.isCustomer());
    console.log(this.isAdmin());
  }

  logout(): void {

    this.authService
      .logout()
      .subscribe({
        next: () => {

          this.router.navigate([
            '/user/login'
          ]);

        },
        error: error => {

          console.error(
            'Logout failed:',
            error
          );

        }
      });

  }

  goToHome(): void {

    this.router.navigate(['/']);

  }

  goToProducts(): void {

    this.router.navigate([
      '/products'
    ]);

  }

  goToDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  goToProfile(): void {
    this.router.navigate(['/user/profile']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  goToOrders(): void {
    this.router.navigate(['/orders']);
  }

  goToProductsManagement(): void {
    this.router.navigate(['/admin/products']);
  }

  goToCreateProduct(): void {
    this.router.navigate(['/admin/products/create']);
  }

  goToCategoriesManagement(): void {
    this.router.navigate(['/admin/categories']);
  }

  goToCreateCategory(): void {
    this.router.navigate(['/admin/categories/create']);
  }

  goToOrdersManagement(): void {
    this.router.navigate(['/admin/orders']);
  }

  goToUsersManagement(): void {
    this.router.navigate(['/admin/users']);
  }

  goToWishlist(): void {
    this.router.navigate(['/wishlist']);
  }

}