import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamierComponent } from './damier.component';

describe('DamierComponent', () => {
  let component: DamierComponent;
  let fixture: ComponentFixture<DamierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
