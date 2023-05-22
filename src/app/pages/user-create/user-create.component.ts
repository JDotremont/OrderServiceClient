import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService,
    private messageService: MessageService,
    private router: Router,
  ) { 
    this.form = formBuilder.group({
      username: [null, [
        Validators.required
      ],],
      password: [null, [
        Validators.required
      ],],
      email: [null, [
        Validators.required,
        Validators.email
      ],],
      role: [null, [
        Validators.required
      ],],
  });
}

submit() {
  if (this.form.invalid)
    return;
  this.UserService.add(this.form.value).subscribe({
    next: data => {
      this.messageService.add({severity:'success', summary:'Success', detail:'User created successfully'});
      this.router.navigate(['/users']);
    },
    error: error => {
      this.messageService.add({severity:'error', summary:'Error', detail:'User creation failed'});
    }
  })
}
}