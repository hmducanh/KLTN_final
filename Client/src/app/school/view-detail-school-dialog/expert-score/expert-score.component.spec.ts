import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertScoreComponent } from './expert-score.component';

describe('ExpertScoreComponent', () => {
  let component: ExpertScoreComponent;
  let fixture: ComponentFixture<ExpertScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertScoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
