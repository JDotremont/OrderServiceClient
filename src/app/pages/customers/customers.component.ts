import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers: any[] = [];  

  constructor(private customerServices: CustomerService) { }

  ngOnInit(): void {
    this.customerServices.getAll().subscribe({
      next: data => {
        this.customers = data;
        console.log(data);
        
      }, //success
      error: error => {
        console.log(error);
      }, //error
      complete: () => {} //complete
    });
}

  
}
