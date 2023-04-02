import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {OrderComponent} from './order/order.component';
import {UserOrdersComponent} from './user-orders/user-orders.component';

const routes: Routes = [
  {
    path: 'order',
    component: OrderComponent
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
