import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginRequest} from 'src/app/rest/request/login-request';
import {Observable, tap} from 'rxjs';
import {LoginResponse} from '../../rest/response/login-response';
import {UserLoginResponse} from '../../rest/response/user-login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  response!: LoginResponse;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.REST_API_URL}/auth/login`, request, this.httpOptions)
               .pipe(
                 tap(
                   {
                     next: response => {
                       this.response = response;
                     }
                   }
                 )
               );
  }

  hasToken(): boolean {
    return this.response != null && this.response.token != null && this.response.token.length > 0;
  }

  getToken(): string {
    return this.response.token;
  }

  getUser(): UserLoginResponse {
    return this.response.user;
  }

}
