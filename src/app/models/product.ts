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
	quantityInStock: number;
}

export interface ProductParams {
	orderBy: string;
    direction: string;
	searchTerm?: string;
	types: string[];
	brands: string[];
	pageNumber: number;
	pageSize: number;
}
