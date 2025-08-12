import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';  
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  message = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    this.auth.register({ username: this.username, email: this.email, password: this.password })
      .subscribe({
        next: () => {
          this.message = 'Registration successful!';
          alert('Registration successfully!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.error = err.error.message || 'Registration failed';
        }
      });
  }
}
