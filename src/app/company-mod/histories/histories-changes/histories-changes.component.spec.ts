import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriesChangesComponent } from './histories-changes.component';

describe('HistoriesChangesComponent', () => {
  let component: HistoriesChangesComponent;
  let fixture: ComponentFixture<HistoriesChangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriesChangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriesChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
