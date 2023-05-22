import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber'
import { ToastModule} from 'primeng/toast';
import { MessageModule} from 'primeng/message';
import { TableModule} from 'primeng/table';
import { DropdownModule} from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ProductsComponent } from './pages/products/products.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomersComponent } from './pages/customers/customers.component';
import { UsersComponent } from './pages/users/users.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginInterceptorInterceptor } from './services/login-interceptor.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';
import { CreateOrderComponent } from './pages/create-order/create-order.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CustomersComponent,
    UsersComponent,
    OrdersComponent,
    ProductCreateComponent,
    FormErrorComponent,
    LoginComponent,
    UserCreateComponent,
    CreateCustomerComponent,
    CreateOrderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
    ToastModule,
    MessageModule,
    TableModule,
    DropdownModule,
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptorInterceptor, multi: true},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
