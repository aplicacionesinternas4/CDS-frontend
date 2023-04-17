/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GridDetailStartComponent } from './grid-detail-start.component';

describe('GridDetailStartComponent', () => {
  let component: GridDetailStartComponent;
  let fixture: ComponentFixture<GridDetailStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridDetailStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridDetailStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
