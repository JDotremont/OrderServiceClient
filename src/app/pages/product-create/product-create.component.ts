import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  form: FormGroup;
  default_status: string = 'in stock';

  constructor(
    private formBuilder: FormBuilder,
    private ProductsService: ProductsService,
    private messageService: MessageService,
    private router: Router,

  ) { 
    this.form = formBuilder.group({
      name: [null, [
        Validators.required
      ],],
      qty: [null, [
        Validators.required
      ],],
      description: [null, [
        Validators.required
      ],],
      price: [null, [
        Validators.required
      ],],
      alert: [null, [
        Validators.required
      ],],
      image: [null, [
      ],],
      status: [this.default_status],
  });
}

submit() {
  if (this.form.invalid)
    return;
  this.ProductsService.add(this.form.value).subscribe({
    next: data => {
      this.messageService.add({severity:'success', summary:'Success', detail:'Product created successfully'});
      this.router.navigate(['/products']);
    },
    error: error => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Product creation failed'});
    }
  })
}
}
