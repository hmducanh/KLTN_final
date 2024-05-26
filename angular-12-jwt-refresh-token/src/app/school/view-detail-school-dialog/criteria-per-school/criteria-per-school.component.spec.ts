import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaPerSchoolComponent } from './criteria-per-school.component';

describe('CriteriaPerSchoolComponent', () => {
  let component: CriteriaPerSchoolComponent;
  let fixture: ComponentFixture<CriteriaPerSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaPerSchoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriaPerSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
