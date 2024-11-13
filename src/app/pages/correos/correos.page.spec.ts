import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CorreosPage } from './correos.page';

describe('CorreosPage', () => {
  let component: CorreosPage;
  let fixture: ComponentFixture<CorreosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CorreosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
