/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GridStartComponent } from './grid-start.component';

describe('GridStartComponent', () => {
  let component: GridStartComponent;
  let fixture: ComponentFixture<GridStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
