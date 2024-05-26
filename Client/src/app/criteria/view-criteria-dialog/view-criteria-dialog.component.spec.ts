import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCriteriaDialogComponent } from './view-criteria-dialog.component';

describe('ViewCriteriaDialogComponent', () => {
  let component: ViewCriteriaDialogComponent;
  let fixture: ComponentFixture<ViewCriteriaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCriteriaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCriteriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
