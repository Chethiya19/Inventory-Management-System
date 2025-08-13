import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-chart-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './chart-layout.component.html',
  styleUrl: './chart-layout.component.css'
})
export class ChartLayoutComponent {

}
