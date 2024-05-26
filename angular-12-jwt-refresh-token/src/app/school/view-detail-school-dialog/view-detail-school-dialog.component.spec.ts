import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailSchoolDialogComponent } from './view-detail-school-dialog.component';

describe('ViewDetailSchoolDialogComponent', () => {
  let component: ViewDetailSchoolDialogComponent;
  let fixture: ComponentFixture<ViewDetailSchoolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetailSchoolDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailSchoolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
