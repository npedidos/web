export default interface PlaceOrderResponse {
  menu: Menu;
  menuWeek: MenuWeek;
  typeDishes: TypeDish[];
}

export interface Menu {
  currentDate: Date;
  nextMenuId: number;
  previousMenuId: number;
}

export interface MenuWeek {
  weekOfYear: number;
  fistDayOfWeek: number;
  lastDayOfWeek: number;
  nextWeekMenuId: number;
  previousWeekMenuId: number;
}

export interface TypeDish {
  id: number;
  name: string;
  foodDishes: FoodDish[];
}

export interface FoodDish {
  id: number;
  name: string;
}
