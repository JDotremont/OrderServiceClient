import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  form!: FormGroup;
  id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
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
    this.loadProduct();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      qty: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      alert: [null, Validators.required],
      image: [null]
    });
  }
  

  loadProduct(): void {
    this.productsService.getProduct(this.id).subscribe((response) => {
      if (response.product) {
        const product = response.product;
        this.form.setValue({
          name: product.name,
          qty: product.qty,
          description: product.description,
          price: product.price,
          alert: product.alert,
          image: product.image
        });
      }
    });
  }
  

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    
    this.productsService.update(this.id, this.form.value).subscribe(() => {
      this.router.navigate(['/products']);
    }, (error) => {
      console.log(error);
    });
  }
}
