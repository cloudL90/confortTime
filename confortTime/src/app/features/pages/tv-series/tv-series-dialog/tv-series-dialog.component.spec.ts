import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvSeriesDialogComponent } from './tv-series-dialog.component';

describe('TvSeriesDialogComponent', () => {
  let component: TvSeriesDialogComponent;
  let fixture: ComponentFixture<TvSeriesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvSeriesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvSeriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
