import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OrderRequest} from '../rest/request/order-request';
import {Observable} from 'rxjs';
import {LoginService} from './auth/login.service';
import {environment} from '../../environments/environment';
import {OrderResponse} from '../rest/response/order-response';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  save(request: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${environment.REST_API_URL}/orders`, request, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.loginService.getToken()})
    });
  }
}
