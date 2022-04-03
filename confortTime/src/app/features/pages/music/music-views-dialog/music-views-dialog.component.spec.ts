import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicViewsDialogComponent } from './music-views-dialog.component';

describe('MusicViewsDialogComponent', () => {
  let component: MusicViewsDialogComponent;
  let fixture: ComponentFixture<MusicViewsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicViewsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicViewsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
