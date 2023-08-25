export interface Order {
    id: string,
    customerId: string,
    menuItemIds: string[],
    approverId: string,
    restaurantId: string,
    dateTime: Date,
    totalPrice: number,
    delivery: string,
    deliveryAddress: string,
    status: string
    restaurantName?: string,
    restaurantLogo?: string,
    restaurantStaffIds?: string[],
    isCurrentUserRestaurantStaff?: boolean
}
