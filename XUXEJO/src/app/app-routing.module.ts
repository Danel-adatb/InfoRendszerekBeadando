import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { GuardService } from './service/guard/guard.service';
import { UserCreateComponent } from './user-create/user-create.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    canActivate: [GuardService],
    component: MenuComponent
  },
  {
    path: 'cart',
    canActivate: [GuardService],
    component: CartComponent
  },
  {
    path: 'user',
    canActivate: [GuardService],
    component: UserComponent
  },
  {
    path: 'user-create',
    canActivate: [GuardService],
    component: UserCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
