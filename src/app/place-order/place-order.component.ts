import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaceOrderService} from '../services/place-order.service';
import PlaceOrderResponse from '../rest/response/pace-order-response';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderService} from '../services/order.service';
import {LoginService} from '../services/auth/login.service';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  response: PlaceOrderResponse;
  placeOrderForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private placeOrderService: PlaceOrderService,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private loginService: LoginService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.response = {
      menu: {
        id: 0,
        nextMenuId: 0,
        currentDate: new Date(),
        previousMenuId: 0
      },
      menuWeek: {
        weekOfYear: 0,
        fistDayOfWeek: 0,
        lastDayOfWeek: 0,
        nextWeekMenuId: 0,
        previousWeekMenuId: 0
      },
      typeDishes: []
    };
    this.placeOrderForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.has('menuId')) {
      const menuId = Number(this.activatedRoute.snapshot.paramMap.get('menuId'));

      this.placeOrderService.placeOrder(menuId)
          .subscribe(this.getNext());
    } else {
      this.placeOrderService.getByCurrentDate()
          .subscribe(this.getNext());
    }
  }

  saveConfirm() {
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea realizar esta acción?',
      accept: () => {
        this.save();
      }
    });
  }

  private getNext() {
    return (response: PlaceOrderResponse) => {
      this.response = response;
      const controlsConfig: any = {};

      this.response.typeDishes.forEach(value => {
        controlsConfig[`food-dishes-radio-${value.id}`] = [null];
      });

      this.placeOrderForm = this.formBuilder.group(controlsConfig);
    };
  }

  private save() {
    this.orderService.save({
      dateOrder: new Date(),
      userId: this.loginService.getUser().id,
      foodDishesId: Object.values(this.placeOrderForm.value)
    })
        .subscribe(response => {
          this.goToOrders();
        });
  }

  cancel() {
    this.goToOrders();
  }

  goToOrders() {
    this.router.navigate(['/users', this.loginService.getUser().id]);
  }
}
