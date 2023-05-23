import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  statusOptions: string[] = ['pending', 'completed', 'canceled'];

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.id = +routeId;
      this.initForm();
      this.loadOrder();
    }
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      customerName: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required],
      orderLines: this.formBuilder.array([]),
    });
  }
  

  get orderLinesControls(): AbstractControl[] {
    return (this.form.get('orderLines') as FormArray).controls;
  }

  loadOrder(): void {
    this.orderService.getOrder(this.id).subscribe((order) => {
      if (order) {
        this.form.patchValue({
          id: order.id,
          customerName: order.customer.firstname + ' ' + order.customer.lastname,
          date: order.date,
          status: order.status
        });
        this.loadOrderLines(order.order_lines);
      }
    });
  }
  
  

  loadOrderLines(orderLines: any[]): void {
    const orderLineFGs = orderLines.map(orderLine => this.formBuilder.group({
      productId: [orderLine.productId, Validators.required],
      productName: [orderLine.product.name, Validators.required],
      qty: [orderLine.qty, Validators.required]
    }));
    const orderLineFormArray = this.formBuilder.array(orderLineFGs);
    this.form.setControl('orderLines', orderLineFormArray);
  }
  

  addOrderLine(): void {
    const orderLinesArray = this.form.get('orderLines') as FormArray;
    orderLinesArray.push(
      this.formBuilder.group({
        productId: ['', Validators.required],
        qty: ['', Validators.required],
      })
    );
  }

  removeOrderLine(index: number): void {
    const orderLinesArray = this.form.get('orderLines') as FormArray;
    orderLinesArray.removeAt(index);
  }

  submit(): void {
    if (this.form.valid) {
      this.orderService.updateOrder(this.id, this.form.value).subscribe(() => {
        this.router.navigate(['/orders']);
      }, (error) => {
        console.error(error);
      });
    }
  }
}
