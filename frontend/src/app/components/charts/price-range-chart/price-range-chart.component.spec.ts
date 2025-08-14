import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceRangeChartComponent } from './price-range-chart.component';

describe('PriceRangeChartComponent', () => {
  let component: PriceRangeChartComponent;
  let fixture: ComponentFixture<PriceRangeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceRangeChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceRangeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
