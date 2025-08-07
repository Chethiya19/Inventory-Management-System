import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  message = '';
  error = '';

  constructor(private settingsService: SettingsService) { }

  changePassword() {
    this.message = '';
    this.error = '';

    if (this.newPassword !== this.confirmPassword) {
      this.error = 'New passwords do not match.';
      return;
    }

    this.settingsService.changePassword({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
    }).subscribe({
      next: (res) => {
        this.message = res.message;
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (err) => {
        const errorMsg = err.error?.message || 'Something went wrong.';
        if (errorMsg.includes('Current password is incorrect')) {
          this.error = 'Your current password is incorrect. Please try again.';
        } else {
          this.error = errorMsg;
        }
      }
    });
  }
}
