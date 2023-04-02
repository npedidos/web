import {Component, OnInit} from '@angular/core';
import {LoginService} from '../services/auth/login.service';
import {LoginRequest} from '../rest/request/login-request';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest: LoginRequest;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginRequest = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    if (this.loginService.hasToken()) {
      this.goToUserOrders(this.loginService.getUser().id);
    }
  }

  login() {
    this.loginService.login(this.loginRequest)
        .subscribe(response => {
          this.goToUserOrders(response.user.id);
        });
  }

  private goToUserOrders(id: number) {
    this.router.navigate([`/users/${id}`]);
  }
}
