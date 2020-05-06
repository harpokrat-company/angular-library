import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureActionComponent } from './secure-action.component';

describe('SecureActionComponent', () => {
  let component: SecureActionComponent;
  let fixture: ComponentFixture<SecureActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecureActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
