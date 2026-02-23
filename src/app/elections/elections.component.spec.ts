import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from '../components/no-data/no-data.component';
import { ElectionsComponent } from './elections.component';

describe('ElectionsComponent', () => {
  let component: ElectionsComponent;
  let fixture: ComponentFixture<ElectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, TranslateModule.forRoot()],
      declarations: [ElectionsComponent, NoDataComponent],
    });
    fixture = TestBed.createComponent(ElectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
