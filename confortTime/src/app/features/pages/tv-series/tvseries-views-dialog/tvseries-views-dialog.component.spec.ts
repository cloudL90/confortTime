import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvseriesViewsDialogComponent } from './tvseries-views-dialog.component';

describe('TvseriesViewsDialogComponent', () => {
  let component: TvseriesViewsDialogComponent;
  let fixture: ComponentFixture<TvseriesViewsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvseriesViewsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvseriesViewsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
