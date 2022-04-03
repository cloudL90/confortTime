import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { comforTimeComponent } from './comforTime.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        comforTimeComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(comforTimeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'confortTime'`, () => {
    const fixture = TestBed.createComponent(comforTimeComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('confortTime');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(comforTimeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('confortTime app is running!');
  });
});
