import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendanceMarkingPage } from './attendance-marking.page';

describe('AttendanceMarkingPage', () => {
  let component: AttendanceMarkingPage;
  let fixture: ComponentFixture<AttendanceMarkingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AttendanceMarkingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
