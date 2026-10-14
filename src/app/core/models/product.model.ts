export interface Product {
  productId?: number;
  productName?: string;
  description?: string;
  price: number;
  discountPrice?: number;
  stockQuantity?: number;
  sku?: string;
  brand?: string;
  imageUrls?: string[];
  categoryName?: string;
  status?: string;
  isFeatured?: boolean;
  available?: boolean;
  createdAt?: string;
  updatedAt?: string;
}