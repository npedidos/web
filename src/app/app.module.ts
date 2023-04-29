import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {PlaceOrderComponent} from './place-order/place-order.component';
import {AppRoutingModule} from './app-routing.module';
import {UserOrdersComponent} from './user-orders/user-orders.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlaceOrderComponent,
    UserOrdersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
