import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeRegistrationComponent } from './document-type-registration.component';

describe('DocumentTypeRegistrationComponent', () => {
  let component: DocumentTypeRegistrationComponent;
  let fixture: ComponentFixture<DocumentTypeRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentTypeRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentTypeRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
