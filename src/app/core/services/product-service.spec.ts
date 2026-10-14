import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ProductService } from './product-service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products from the API', () => {
    const mockProducts = [
      { id: 1, name: 'Laptop', price: 1200, description: 'Gaming laptop' }
    ];

    let result: any[] | undefined;

    service.getProducts().subscribe((products) => {
      result = products;
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/products');
    expect(req.request.method).toBe('GET');

    req.flush(mockProducts);
    expect(result).toEqual(mockProducts);
  });
});
