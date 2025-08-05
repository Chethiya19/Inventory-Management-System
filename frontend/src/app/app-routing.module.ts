// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';

import { ProductListComponent } from './components/products/product-list/product-list.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';

import { StockInComponent } from './components/stock/stock-in/stock-in.component';
import { StockOutComponent } from './components/stock/stock-out/stock-out.component';
import { LowStockAlertsComponent } from './components/stock/low-stock-alerts/low-stock-alerts.component';

import { BrandComponent } from './components/brand/brand.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SettingsComponent } from './components/settings/settings.component';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    component: DashboardLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'edit-product/:id', component: EditProductComponent },
      { path: 'stock-in', component: StockInComponent },
      { path: 'stock-out', component: StockOutComponent },
      { path: 'low-stock', component: LowStockAlertsComponent },
      { path: 'brands', component: BrandComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
