import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';       // For *ngFor etc.
import { FormsModule , ReactiveFormsModule } from '@angular/forms';         // For [(ngModel)]
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';

import { AppRoutingModule } from './app-routing.module';

// Import standalone components
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';

import { StockInComponent } from './components/stock/stock-in/stock-in.component';
import { StockOutComponent } from './components/stock/stock-out/stock-out.component';
import { LowStockAlertsComponent } from './components/stock/low-stock-alerts/low-stock-alerts.component';

import { BrandComponent } from './components/brand/brand.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ReportComponent } from './components/report/report.component';
import { SettingsComponent } from './components/settings/settings.component';
// import { ChartComponent } from './components/chart/chart.component';

import { ChartLayoutComponent } from './components/charts/chart-layout/chart-layout.component';
import { NavbarComponent } from './components/charts/navbar/navbar.component';
import { BrandStockChartComponent } from './components/charts/brand-stock-chart/brand-stock-chart.component';
import { ProductStockChartComponent } from './components/charts/product-stock-chart/product-stock-chart.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,       // Needed for directives like *ngFor
    FormsModule,        // Needed for ngModel binding
    RouterModule,
    ReactiveFormsModule,
    NgApexchartsModule,

    // Standalone components imported here
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardLayoutComponent,
    DashboardComponent,
    AddProductComponent,
    ProductListComponent,
    EditProductComponent,
    StockInComponent,
    StockOutComponent,
    LowStockAlertsComponent,
    BrandComponent,
    OrdersComponent,
    ReportComponent,
    SettingsComponent,
    // ChartComponent,
    ChartLayoutComponent,
    NavbarComponent,
    ProductStockChartComponent,
    BrandStockChartComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
