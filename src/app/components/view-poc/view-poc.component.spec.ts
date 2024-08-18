import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPocComponent } from './view-poc.component';

describe('ViewPocComponent', () => {
  let component: ViewPocComponent;
  let fixture: ComponentFixture<ViewPocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
