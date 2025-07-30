import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <h2>Welcome to Dashboard</h2>
    <button (click)="logout()">Logout</button>
  `
})
export class DashboardComponent {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
