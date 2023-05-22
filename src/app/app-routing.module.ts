import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { UsersComponent } from './pages/users/users.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { LoginComponent } from './pages/login/login.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';
import { CreateOrderComponent } from './pages/create-order/create-order.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full'},
  { path: 'products', component: ProductsComponent},
  { path: 'products/create', component: ProductCreateComponent},
  { path: 'customers', component: CustomersComponent},
  { path: 'customers/create', component: CreateCustomerComponent},
  { path: 'users', component: UsersComponent},
  { path: 'users/create', component: UserCreateComponent},
  { path: 'orders', component: OrdersComponent},
  { path: 'orders/create', component: CreateOrderComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
