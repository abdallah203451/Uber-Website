import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverOrRiderComponent } from './driver-or-rider.component';

describe('DriverOrRiderComponent', () => {
  let component: DriverOrRiderComponent;
  let fixture: ComponentFixture<DriverOrRiderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriverOrRiderComponent]
    });
    fixture = TestBed.createComponent(DriverOrRiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
