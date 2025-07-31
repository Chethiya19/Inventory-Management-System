import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  username = localStorage.getItem('username'); // adjust as per your auth logic

  constructor(private router: Router) {}

  logout() {
    localStorage.clear(); // or just remove token/username
    this.router.navigate(['/login']);
  }
}
