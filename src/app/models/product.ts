import { ProductBrand } from "./productBrand";
import { ProductType } from "./productType";

export interface Product  {
  id: number;
  type: ProductType;
  brand: ProductBrand;
  typeId: number;
  brandId: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  // type: ProductType;
  // brand: ProductBrand;
  quantityInStock: number;
}