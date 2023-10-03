import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSignInComponent } from './driver-sign-in.component';

describe('DriverSignInComponent', () => {
  let component: DriverSignInComponent;
  let fixture: ComponentFixture<DriverSignInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriverSignInComponent]
    });
    fixture = TestBed.createComponent(DriverSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
