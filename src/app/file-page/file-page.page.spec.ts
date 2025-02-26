import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FilePagePage } from './file-page.page';

describe('FilePagePage', () => {
  let component: FilePagePage;
  let fixture: ComponentFixture<FilePagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilePagePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
