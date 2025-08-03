import type { ProductBrand } from './productBrand';
import type { ProductType } from './productType';

export interface Product {
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
