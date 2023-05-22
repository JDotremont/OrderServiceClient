import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: any[] = [];  

  constructor(private userServices: UserService) { }

  ngOnInit(): void {
    this.userServices.getAll().subscribe({
      next: data => {
        this.users = data;
      }, //success
      error: error => {
        console.log(error);
      }, //error
      complete: () => {} //complete
    });
}

delete(userId: number) {
  this.userServices.delete(userId).subscribe({
      next: data => {
          this.users = this.users.filter(user => user.id !== userId);
      },
      error: error => {
          console.log(error);
      }
  });
}

}
