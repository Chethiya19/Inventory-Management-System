import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandStockChartComponent } from './brand-stock-chart.component';

describe('BrandStockChartComponent', () => {
  let component: BrandStockChartComponent;
  let fixture: ComponentFixture<BrandStockChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandStockChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandStockChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
