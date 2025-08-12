import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  private usernameSubject = new BehaviorSubject<string | null>(this.getStoredUsername());
  username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, { withCredentials: true });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap((res: any) => {
        // Ensure username is stored before navigation
        if (res?.user?.username) {
          this.setUsername(res.user.username);
        }
      })
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe(() => {
      this.clearSession();
      this.router.navigate(['/login']);
    });
  }

  setUsername(username: string): void {
    localStorage.setItem('username', username);
    this.usernameSubject.next(username);
  }

  getUsername(): string {
    return localStorage.getItem('username') || 'User';
  }

  private getStoredUsername(): string | null {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('username');
  }

  clearSession(): void {
    localStorage.removeItem('username');
    this.usernameSubject.next(null);
  }
}
