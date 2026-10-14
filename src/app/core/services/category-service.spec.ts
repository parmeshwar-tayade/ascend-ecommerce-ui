import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environment/envionment';
import { CategoryService } from './category-service';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch categories from the category endpoint', () => {
    const mockCategories = [{ id: 1, categoryName: 'Electronics' }];

    service.getCategories().subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}${environment.endpoints.category.getAll}`
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });
});
