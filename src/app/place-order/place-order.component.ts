import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaceOrderService} from '../services/place-order.service';
import PlaceOrderResponse from '../rest/response/pace-order-response';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderService} from '../services/order.service';
import {LoginService} from '../services/auth/login.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {HttpErrorResponse} from '@angular/common/http';
import ErrorResponse from '../rest/response/error-response';

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
    private router: Router,
    private messageService: MessageService
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

      this.getPlaceOrderByMenuId(menuId);
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

  private getPlaceOrderByMenuId(menuId: number) {
    this.placeOrderService.placeOrder(menuId)
        .subscribe(this.getNext());
  }

  private getNext() {
    return {
      next: (response: PlaceOrderResponse) => {
        this.response = response;
        const controlsConfig: any = {};

        this.response.typeDishes.forEach(value => {
          controlsConfig[`food-dishes-radio-${value.id}`] = [null];
        });

        this.placeOrderForm = this.formBuilder.group(controlsConfig);
      },
      error: (httpErrorResponse: HttpErrorResponse) => {
        const errorResponse: ErrorResponse = httpErrorResponse.error;

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorResponse.error.description,
          life: 5000
        });
      }
    };
  }

  private save() {
    this.orderService.save({
      dateOrder: new Date(),
      userId: this.loginService.getUser().id,
      foodDishesId: Object.values(this.placeOrderForm.value)
    })
        .subscribe(response => {
          this.messageService.add({
            severity: 'success',
            summary: 'Acción realizada',
            detail: 'La acción ha sido realizada correctamente',
            life: 5000
          });
          this.goToOrders();
        });
  }

  cancel() {
    this.goToOrders();
  }

  goToOrders() {
    this.router.navigate(['/users', this.loginService.getUser().id]);
  }

  isNullOrUndefined(value: number) {
    return value === null || value === undefined;
  }

  previousWeekMenu() {
    this.goToPlaceOrder(this.response.menuWeek.previousWeekMenuId);
  }

  nextWeekMenu() {
    this.goToPlaceOrder(this.response.menuWeek.nextWeekMenuId);
  }

  previousMenu() {
    this.goToPlaceOrder(this.response.menu.previousMenuId);
  }

  nextMenu() {
    this.goToPlaceOrder(this.response.menu.nextMenuId);
  }

  private goToPlaceOrder(menuId: number) {
    this.router.navigate(['/place-order', menuId])
        .then(value => {
          this.getPlaceOrderByMenuId(menuId);
        });
  }

}
