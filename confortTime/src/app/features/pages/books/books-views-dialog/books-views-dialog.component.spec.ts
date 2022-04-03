import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksViewsDialogComponent } from './books-views-dialog.component';

describe('BooksViewsDialogComponent', () => {
  let component: BooksViewsDialogComponent;
  let fixture: ComponentFixture<BooksViewsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksViewsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksViewsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
