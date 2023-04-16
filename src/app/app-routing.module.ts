import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PlaceOrderComponent} from './place-order/place-order.component';
import {UserOrdersComponent} from './user-orders/user-orders.component';

const routes: Routes = [
  {
    path: 'place-order/:menuId',
    component: PlaceOrderComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users/:id',
    component: UserOrdersComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
