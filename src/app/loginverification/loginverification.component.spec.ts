import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginverificationComponent } from './loginverification.component';

describe('LoginverificationComponent', () => {
  let component: LoginverificationComponent;
  let fixture: ComponentFixture<LoginverificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginverificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
