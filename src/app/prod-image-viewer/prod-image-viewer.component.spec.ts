import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdImageViewerComponent } from './prod-image-viewer.component';

describe('ProdImageViewerComponent', () => {
  let component: ProdImageViewerComponent;
  let fixture: ComponentFixture<ProdImageViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdImageViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
