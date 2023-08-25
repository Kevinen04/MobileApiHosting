import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForecastsPage } from './forecast.page';

describe('ForecastPage', () => {
  let component: ForecastsPage;
  let fixture: ComponentFixture<ForecastsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ForecastsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
