import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="hasAdminOrSellerRole()">...</div>
  `,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(public authService: AuthServiceService) {}

  hasAdminOrSellerRole(): boolean {
    return this.authService.hasRole('admin') || this.authService.hasRole('seller');
  }

  hasRole(role: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === role;
  }

  get isLogged$() {
    return this.authService.isConnected$;
  }

  logout() {
    this.authService.logout();
  }

  get isLogged() {
    return this.authService.isLogged;
  }
}
