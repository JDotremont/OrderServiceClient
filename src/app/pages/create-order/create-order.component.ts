import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
    form!: FormGroup;
  
    constructor(
      private formBuilder: FormBuilder,
      private orderService: OrderService,
      private messageService: MessageService,
      private router: Router
    ) { 
      this.form = this.formBuilder.group({
        customerId: [null, Validators.required],
        orderLine: this.formBuilder.array([
          this.createOrderLine()
        ])
      });
    }    
  
    ngOnInit() {
      this.form = this.formBuilder.group({
        customerId: [null, Validators.required],
        orderLine: this.formBuilder.array([
          this.createOrderLine()
        ])
      });
    }
  
    createOrderLine(): FormGroup {
      return this.formBuilder.group({
        productId: [null, Validators.required],
        qty: [null, Validators.required]
      });
    }
  
    addOrderLine(): void {
      const orderLines = this.form.get('orderLine') as FormArray;
      orderLines.push(this.createOrderLine());
    }
  
    removeOrderLine(index: number): void {
      const orderLines = this.form.get('orderLine') as FormArray;
      orderLines.removeAt(index);
    }
  
    submit(): void {
      if (this.form.invalid) {
        return;
      }
  
      this.orderService.add(this.form.value).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order created successfully' });
          this.router.navigate(['/orders']);
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Order creation failed' });
        }
      );
    }
  }