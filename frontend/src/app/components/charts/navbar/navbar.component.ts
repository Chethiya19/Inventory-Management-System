import { Component } from '@angular/core';
import { Router, IsActiveMatchOptions } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }

  private exact: IsActiveMatchOptions = {
    paths: 'exact', queryParams: 'ignored', fragment: 'ignored', matrixParams: 'ignored'
  };

  isActive(url: string): boolean {
    return this.router.isActive(url, this.exact);
  }
}
