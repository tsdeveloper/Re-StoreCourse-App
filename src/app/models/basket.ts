export interface Basket {
	id: number;
	buyerId: string;
	basketItems: BasketItem[];
}

export interface BasketItem {
	id: number;
	quantity: number;
	productId: number;
	basketId: number;
	name: string;
	price: number;
	pictureUrl: string;
}
