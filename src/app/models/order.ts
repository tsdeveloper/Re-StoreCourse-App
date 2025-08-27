export interface Order {
    id: number
    buyerId: string
    shippingAddress: ShippingAddress
    orderDate: string
    orderItems: OrderItem[]
    subTotal: number
    deliveryFee: number
    orderStatus: string
}

export interface ShippingAddress {
    fullName: string
    address1: string
    address2: string
    city: string
    state: string
    zip: string
    country: string
    id: number
    createdAt: string
    updateAt: any
}

export interface OrderItem {
    id: number
    productId: number
    name: string
    pictureUrl: string
    price: number
    quantity: number
}
