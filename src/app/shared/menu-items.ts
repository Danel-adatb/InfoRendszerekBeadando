import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    icon: string;
}

const MENUITEMS = [
    {
        state: 'dashboard',
        name: 'Menu',
        icon: 'dashboard'
    },
    {
        state: 'cart',
        name: 'Shopping Cart',
        icon: 'add_shopping_cart'
    }
]

@Injectable()
export class menuItems {
    getMenuItem(): Menu[] {
        return MENUITEMS;
    }
}