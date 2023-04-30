import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LoginService} from './auth/login.service';
import {Observable} from 'rxjs';
import PlaceOrderResponse from '../rest/response/pace-order-response';

@Injectable({
  providedIn: 'root'
})
export class PlaceOrderService {

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  placeOrder(menuId: number): Observable<PlaceOrderResponse> {
    return this.http.get<PlaceOrderResponse>(`${environment.REST_API_URL}/place-order/${menuId}`, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.loginService.getToken()})
    });
  }

  getByCurrentDate(): Observable<PlaceOrderResponse> {
    return this.http.get<PlaceOrderResponse>(`${environment.REST_API_URL}/place-order`, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.loginService.getToken()})
    });
  }
}
