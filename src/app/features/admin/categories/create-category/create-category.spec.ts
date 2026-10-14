import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CategoryService } from '../../../../core/services/category-service';
import { CreateCategory } from './create-category';

describe('CreateCategory', () => {
  let component: CreateCategory;
  let fixture: ComponentFixture<CreateCategory>;
  let categoryService: any;

  beforeEach(async () => {
    categoryService = {
      createCategory: vi.fn().mockReturnValue(of({
        categoryId: 1,
        name: 'Electronics',
        description: 'Tech products'
      }))
    };

    await TestBed.configureTestingModule({
      imports: [CreateCategory],
      providers: [{ provide: CategoryService, useValue: categoryService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
