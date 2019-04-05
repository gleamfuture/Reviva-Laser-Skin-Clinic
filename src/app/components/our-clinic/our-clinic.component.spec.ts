import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurClinicComponent } from './our-clinic.component';

describe('OurClinicComponent', () => {
  let component: OurClinicComponent;
  let fixture: ComponentFixture<OurClinicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurClinicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
