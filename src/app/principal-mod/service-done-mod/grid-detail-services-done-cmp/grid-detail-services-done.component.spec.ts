/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GridDetailServicesDoneComponent } from './grid-detail-services-done.component';

describe('GridDetailServicesDoneComponent', () => {
  let component: GridDetailServicesDoneComponent;
  let fixture: ComponentFixture<GridDetailServicesDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridDetailServicesDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridDetailServicesDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
