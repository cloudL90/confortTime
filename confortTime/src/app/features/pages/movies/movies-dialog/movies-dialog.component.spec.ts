import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesDialogComponent } from './movies-dialog.component';

describe('MoviesDialogComponent', () => {
  let component: MoviesDialogComponent;
  let fixture: ComponentFixture<MoviesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
