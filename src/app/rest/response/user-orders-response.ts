import {PagingAndSortingResponse} from "./paging-and-sorting-response";

export interface UserOrdersResponse extends PagingAndSortingResponse<Order> {

}

export interface Order {
  id: number;
  dateOrder: string;
}
