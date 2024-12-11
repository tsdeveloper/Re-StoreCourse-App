export interface Product  {
 id: number;
  typeId?: number;
  brandId?: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  // type: ProductType;
  // brand: ProductBrand;
  quantityInStock: number;
}