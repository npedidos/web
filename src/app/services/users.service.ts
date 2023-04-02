import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserOrdersResponse} from '../rest/response/user-orders-response';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {LoginService} from './auth/login.service';
import {PagingAndSortingRequest} from '../rest/request/paging-and-sorting-request';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {
  }

  findAllOrders(id: number, pagingAndSorting?: PagingAndSortingRequest | null): Observable<UserOrdersResponse> {
    if (pagingAndSorting == null) {
      pagingAndSorting = {
        paging: {
          page: 0,
          size: 10
        },
        sorting: []
      };
    }

    return this.http.get<UserOrdersResponse>(`${environment.REST_API_URL}/users/${id}/orders`, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.loginService.getToken()}),
      params: new HttpParams({fromObject: {'f': btoa(JSON.stringify(pagingAndSorting))}})
    });
  }
}
