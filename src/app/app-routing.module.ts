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
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { CustomerEditComponent } from './pages/customer-edit/customer-edit.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { OrderEditComponent } from './pages/order-edit/order-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'products', component: ProductsComponent},
  { path: 'products/create', component: ProductCreateComponent},
  { path: 'products/:id/edit', component: ProductEditComponent },
  { path: 'customers', component: CustomersComponent},
  { path: 'customers/create', component: CreateCustomerComponent},
  { path: 'customers/:id/edit', component: CustomerEditComponent},
  { path: 'users', component: UsersComponent},
  { path: 'users/create', component: UserCreateComponent},
  { path: 'users/:id/edit', component: UserEditComponent},
  { path: 'orders', component: OrdersComponent},
  { path: 'orders/create', component: CreateOrderComponent},
  { path: 'orders/:id/edit', component: OrderEditComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
