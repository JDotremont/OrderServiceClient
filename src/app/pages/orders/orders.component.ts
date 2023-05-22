import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{
    
    orders: any[] = [];  
    
    constructor(private orderServices: OrderService) { }
  
    ngOnInit(): void {
      this.orderServices.getAll().subscribe({
        next: data => {
          this.orders = data;
          console.log(data);
        }, //success
        error: error => {
          console.log(error);
        }, //error
        complete: () => {} //complete
      });
}
}
