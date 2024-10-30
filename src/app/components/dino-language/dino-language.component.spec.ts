import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DinoLanguageComponent } from './dino-language.component';

describe('DinoLanguageComponent', () => {
  let component: DinoLanguageComponent;
  let fixture: ComponentFixture<DinoLanguageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DinoLanguageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DinoLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
