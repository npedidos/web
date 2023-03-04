import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {OrderComponent} from './order/order.component';
import {AppRoutingModule} from './app-routing.module';
import {UserOrdersComponent} from './user-orders/user-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderComponent,
    UserOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
