import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter, RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { RunnerService } from './services/runner.service';

class MockRunnerService {
  getYears() {
    return [2023, 2024];
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterModule.forRoot([])],
      providers: [
        provideRouter([]),
        { provide: RunnerService, useClass: MockRunnerService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have title 'advent-of-code'`, () => {
    expect(component.title).toEqual('advent-of-code');
  });

  describe('html', () => {
    it('should render the navbar with correct brand title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const navbarBrand = compiled.querySelector('.navbar-brand');
      expect(navbarBrand?.textContent).toContain('🎄 Advent Of Code 🎄');
    });

    it('should dynamically generate navigation links based on years', () => {
      const links = fixture.debugElement.queryAll(By.css('.nav-link'));
      expect(links.length).toBe(2);

      const linkTexts = links.map((link) =>
        link.nativeElement.textContent.trim()
      );
      expect(linkTexts).toEqual(['2023', '2024']);

      const linkHrefs = links.map((link) =>
        link.nativeElement.getAttribute('href')
      );
      expect(linkHrefs).toEqual(['/year/2023', '/year/2024']);
    });
  });
});
