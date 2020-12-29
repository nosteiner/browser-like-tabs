import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTabViewComponent } from './active-tab-view.component';

describe('ActiveTabViewComponent', () => {
  let component: ActiveTabViewComponent;
  let fixture: ComponentFixture<ActiveTabViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveTabViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
