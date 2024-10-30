import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DinoHeaderComponent } from './dino-header.component';

describe('DinoHeaderComponent', () => {
  let component: DinoHeaderComponent;
  let fixture: ComponentFixture<DinoHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DinoHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DinoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
