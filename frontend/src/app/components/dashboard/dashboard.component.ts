import { Component, OnInit } from '@angular/core';
import { StatsService, Counts } from '../../services/stats.sevice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  counts: Counts = { products: 0, brands: 0 };
  loading = true;
  error: string | null = null;

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.statsService.getCounts().subscribe({
      next: (data) => {
        this.counts = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load stats';
        this.loading = false;
      }
    });
  }
}
