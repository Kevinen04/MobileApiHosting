export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    restaurantId: string;
    picture?: string;
}