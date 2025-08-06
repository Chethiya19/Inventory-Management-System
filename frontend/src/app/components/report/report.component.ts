import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  type: string = 'in';
  startDate: string = '';
  endDate: string = '';
  reportData: any[] = [];

  constructor(private reportService: ReportService) { }

  fetchReport() {
    if (this.startDate && this.endDate) {
      this.reportService.getStockHistory(this.type, this.startDate, this.endDate)
        .subscribe(data => {
          this.reportData = data;
        });
    }
  }
}