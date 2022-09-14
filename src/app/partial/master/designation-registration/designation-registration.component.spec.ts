import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationRegistrationComponent } from './designation-registration.component';

describe('DesignationRegistrationComponent', () => {
  let component: DesignationRegistrationComponent;
  let fixture: ComponentFixture<DesignationRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignationRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
