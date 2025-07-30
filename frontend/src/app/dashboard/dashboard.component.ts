import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  username = 'User'; // Optional: You can set from authService if available

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
