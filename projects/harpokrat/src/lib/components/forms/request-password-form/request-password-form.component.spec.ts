import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPasswordFormComponent } from './request-password-form.component';

describe('RequestPasswordFormComponent', () => {
  let component: RequestPasswordFormComponent;
  let fixture: ComponentFixture<RequestPasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPasswordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
