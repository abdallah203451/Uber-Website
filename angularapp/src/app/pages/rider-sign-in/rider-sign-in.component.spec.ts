import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderSignInComponent } from './rider-sign-in.component';

describe('RiderSignInComponent', () => {
  let component: RiderSignInComponent;
  let fixture: ComponentFixture<RiderSignInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiderSignInComponent]
    });
    fixture = TestBed.createComponent(RiderSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
