import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesViewsDialogComponent } from './movies-views-dialog.component';

describe('MoviesViewsDialogComponent', () => {
  let component: MoviesViewsDialogComponent;
  let fixture: ComponentFixture<MoviesViewsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesViewsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesViewsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
