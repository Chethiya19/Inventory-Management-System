import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStockChartComponent } from './product-stock-chart.component';

describe('ProductStockChartComponent', () => {
  let component: ProductStockChartComponent;
  let fixture: ComponentFixture<ProductStockChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductStockChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStockChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
