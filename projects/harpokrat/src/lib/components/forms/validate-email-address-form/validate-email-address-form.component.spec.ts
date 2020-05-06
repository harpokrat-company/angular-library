import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateEmailAddressFormComponent } from './validate-email-address-form.component';

describe('ValidateEmailAddressFormComponent', () => {
  let component: ValidateEmailAddressFormComponent;
  let fixture: ComponentFixture<ValidateEmailAddressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateEmailAddressFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateEmailAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
