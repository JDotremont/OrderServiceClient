import { Component, OnChanges, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { TagModule } from 'primeng/tag'; // 

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  
  products: any[] = [];  
  
  constructor(private productServices: ProductsService) { }

  ngOnInit(): void {
    this.productServices.getAll().subscribe({
      next: data => {
        this.products = data;
      }, //success
      error: error => {
        console.log(error);
      }, //error
      complete: () => {} //complete
    });
}

delete(productId: number) {
  this.productServices.delete(productId).subscribe({
      next: data => {
          this.products = this.products.filter(product => product.id !== productId);
      },
      error: error => {
          console.log(error);
      }
  });
}
  
}
