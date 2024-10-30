import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DinoFooterComponent } from './dino-footer.component';

describe('DinoFooterComponent', () => {
  let component: DinoFooterComponent;
  let fixture: ComponentFixture<DinoFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DinoFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DinoFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
