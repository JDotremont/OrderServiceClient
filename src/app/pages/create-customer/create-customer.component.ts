import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private messageService: MessageService,
    private router: Router,
  ) { 
    this.form = formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      street: [null, Validators.required],
      number: [null, Validators.required],
      zipcode: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.customerService.add(this.form.value).subscribe({
      next: data => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Customer created successfully'});
        this.router.navigate(['/customers']);
      },
      error: error => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Customer creation failed'});
      }
    });
  }
}