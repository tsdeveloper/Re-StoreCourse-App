import { ProductBrand } from "./productBrand";
import { ProductType } from "./productType";

export interface Product  {
  type?: ProductType;
  brand?: ProductBrand;
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