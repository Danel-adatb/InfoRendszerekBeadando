import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';



export const MaterialRoutes: Routes = [
    {
        path: 'cart',
        component: CartComponent
    }
];
