import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleStructureComponent } from './nouvelle-structure.component';

describe('NouvelleStructureComponent', () => {
  let component: NouvelleStructureComponent;
  let fixture: ComponentFixture<NouvelleStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouvelleStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
