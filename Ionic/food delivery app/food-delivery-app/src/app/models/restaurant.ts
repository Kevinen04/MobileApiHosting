import { MenuItem } from "./menu-item";

export interface Restaurant {
    id: string;
    name: string;
    location?: {
        long: number;
        lat: number;
    };
    phoneNumber: string;
    description: string;
    logo: string;
    staffIds: string[];
    menuItems: MenuItem[];
}