import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilePagePage } from './file-page.page';

describe('FilePagePage', () => {
  let component: FilePagePage;
  let fixture: ComponentFixture<FilePagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FilePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
