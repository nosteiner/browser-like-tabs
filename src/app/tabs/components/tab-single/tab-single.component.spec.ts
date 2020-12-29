import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSingleComponent } from './tab-single.component';

describe('TabSingleComponent', () => {
  let component: TabSingleComponent;
  let fixture: ComponentFixture<TabSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
