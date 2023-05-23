import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserService } from 'src/app/services/user.service';
import {tap} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  entityForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private userService: UserService,
    private router: Router,
  ) {}
    
  ngOnInit(): void {
    this.entityForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.entityForm.valid) {
      this.authService.login(this.entityForm.value).subscribe(
        (res: any) => {
          console.log(res);
          this.router.navigate(['/products']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
}


  logout() {
    this.authService.logout();
  }

  get isLogged() {
    return this.authService.isLogged;
  }

}
