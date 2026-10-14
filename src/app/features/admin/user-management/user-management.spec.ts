import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { UserManagement } from './user-management';
import { UserService } from '../../../core/services/user-service';

describe('UserManagement', () => {
  let component: UserManagement;
  let fixture: ComponentFixture<UserManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagement],
      providers: [
        provideHttpClient(),
        {
          provide: UserService,
          useValue: {
            getUsers: () => of([
              {
                id: 1,
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane@demo.com',
                roles: ['ADMIN', 'USER'],
              }
            ]),
            deleteUser: () => of(void 0),
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render user management content', () => {
    expect(fixture.nativeElement.textContent).toContain('User Management');
  });
});
