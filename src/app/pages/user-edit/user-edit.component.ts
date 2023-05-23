import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  form!: FormGroup;
  id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
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
    this.loadUser();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  loadUser(): void {
    this.userService.getUser(this.id).subscribe(({user}) => {
      
      if (user) {
        this.form.patchValue(user);
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
  
    const user = {
      username: this.form.value.username,
      password: this.form.value.password,
      role: this.form.value.role,
      email: this.form.value.email
    };
  
    this.userService.update(this.id, user).subscribe(() => {
      this.router.navigate(['/users']);
    }, (error) => {
      console.log(error);
    });
  }
  
  
}
