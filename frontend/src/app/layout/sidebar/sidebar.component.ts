import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isStockDropdownOpen = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Keep dropdown open only if the URL matches any of the stock subroutes
        this.isStockDropdownOpen =
          event.url.includes('/stock-in') ||
          event.url.includes('/stock-out') ||
          event.url.includes('/low-stock');
      }
    });
  }

  toggleStockDropdown(event: Event) {
    event.preventDefault(); // Prevent unwanted navigation
    this.isStockDropdownOpen = !this.isStockDropdownOpen;
  }
}
