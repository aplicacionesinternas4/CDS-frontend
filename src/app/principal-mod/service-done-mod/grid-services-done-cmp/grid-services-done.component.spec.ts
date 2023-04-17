/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GridServicesDoneComponent } from './grid-services-done.component';

describe('GridServicesDoneComponent', () => {
  let component: GridServicesDoneComponent;
  let fixture: ComponentFixture<GridServicesDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridServicesDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridServicesDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
