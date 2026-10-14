import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { UserProfile } from '../../../core/models/user-profile';
import { UserService } from '../../../core/services/user-service';

interface AdminUserRow {
  id: number;
  fullName: string;
  email: string;
  roles: string[];
  status: 'ACTIVE' | 'ADMIN' | 'PENDING';
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  styleUrl: './user-management.css',
  templateUrl: './user-management.html',
})
export class UserManagement implements OnInit {
  private readonly userService = inject(UserService);

  readonly users = signal<AdminUserRow[]>([]);
  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly displayedColumns = ['id', 'name', 'email', 'roles', 'status', 'actions'];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users.set(this.normalizeUsers(response));
        this.loading.set(false);
      },
      error: () => {
        this.users.set([]);
        this.errorMessage.set('Unable to load user records.');
        this.loading.set(false);
      }
    });
  }

  deleteUser(id?: number): void {
    if (!id) {
      return;
    }

    this.userService.deleteUser(id).subscribe({
      next: () => this.loadUsers(),
      error: () => {
        this.errorMessage.set('Unable to delete user.');
      }
    });
  }

  private normalizeUsers(users: UserProfile[]): AdminUserRow[] {
    return users.map((user, index) => {
      const roles = this.normalizeRoles(user.roles);

      return {
        id: user.id ?? index + 1,
        fullName: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'Unknown User',
        email: user.email ?? 'N/A',
        roles,
        status: roles.includes('ADMIN') ? 'ADMIN' : 'ACTIVE',
      };
    });
  }

  private normalizeRoles(roles: string[] | Array<{ role?: string }> | undefined): string[] {
    if (!Array.isArray(roles) || roles.length === 0) {
      return ['USER'];
    }

    return roles.map((role) => typeof role === 'string' ? role : role?.role ?? 'USER');
  }
}
