import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScroingDialogComponent } from './scroing-dialog.component';

describe('ScroingDialogComponent', () => {
  let component: ScroingDialogComponent;
  let fixture: ComponentFixture<ScroingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScroingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScroingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
