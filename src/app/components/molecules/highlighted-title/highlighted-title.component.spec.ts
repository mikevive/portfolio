import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightedTitleComponent } from './highlighted-title.component';

describe('HighlightedTitleComponent', () => {
  let component: HighlightedTitleComponent;
  let fixture: ComponentFixture<HighlightedTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighlightedTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightedTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
