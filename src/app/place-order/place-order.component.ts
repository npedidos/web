import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlaceOrderService} from '../services/place-order.service';
import PlaceOrderResponse from '../rest/response/pace-order-response';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  response: PlaceOrderResponse;

  constructor(private activatedRoute: ActivatedRoute, private placeOrderService: PlaceOrderService) {
    this.response = {
      menu: {
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
  }

  ngOnInit(): void {
    const menuId = Number(this.activatedRoute.snapshot.paramMap.get('menuId'));

    this.placeOrderService.placeOrder(menuId)
        .subscribe(response => {
          this.response = response;
        });
  }

}
