import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
    form!: FormGroup;
    id!: number;
  
    constructor(
      private formBuilder: FormBuilder,
      private customerService: CustomerService,
      private route: ActivatedRoute,
      private router: Router
    ) { }
  
    ngOnInit(): void {
      const routeId = this.route.snapshot.paramMap.get('id');
      if (!routeId) {
        return;
      }
      
      this.id = +routeId;
      this.initForm();
      this.loadCustomer();
    }
  
    initForm(): void {
      this.form = this.formBuilder.group({
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        street: [null, Validators.required],
        number: [null, Validators.required],
        zipcode: [null, Validators.required],
        city: [null, Validators.required],
        country: [null, Validators.required]
      });
    }
  
    loadCustomer(): void {
      this.customerService.getCustomer(this.id).subscribe((response) => {
        if (response.customer) {
          const customer = response.customer;
          this.form.setValue({
            firstname: customer.firstname,
            lastname: customer.lastname,
            email: customer.email,
            street: customer.street,
            number: customer.number,
            zipcode: customer.zipcode,
            city: customer.city,
            country: customer.country
          });
        }
      });
    }
  
    submit(): void {
      if (this.form.invalid) {
        return;
      }
      
      this.customerService.updateCustomer(this.id, this.form.value).subscribe(() => {
        this.router.navigate(['/customers']);
      }, (error) => {
        console.log(error);
      });
    }
  }