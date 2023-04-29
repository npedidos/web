import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../services/users.service';
import {UserOrdersResponse} from '../rest/response/user-orders-response';
import {PagingAndSortingRequest} from '../rest/request/paging-and-sorting-request';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  response: UserOrdersResponse;

  private pageAndSortingRequest: PagingAndSortingRequest | null = null;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.response = {
      content: [],
      pageSize: 0,
      total: 0,
      currentPage: 0,
      totalPages: 0
    };
    this.pageAndSortingRequest = {
      paging: {
        page: 0,
        size: 10
      },
      sorting: [
        {
          property: 'id',
          direction: 'DESC'
        }
      ]
    };
  }

  ngOnInit(): void {
    const currentUserId = Number(this.route.snapshot.paramMap.get('id'));

    this.usersService.findAllOrders(currentUserId, this.pageAndSortingRequest)
        .subscribe(response => {
          this.response = response;
        });
  }

  onPage(event: any) {
    const currentUserId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.response.content.length > 0) {
      const page = event.first / event.rows;
      this.pageAndSortingRequest = {
        paging: {
          page: page,
          size: event.rows
        },
        sorting: []
      };
    }

    this.usersService.findAllOrders(currentUserId, this.pageAndSortingRequest)
        .subscribe(response => {
          this.response = response;
        });
  }

}
