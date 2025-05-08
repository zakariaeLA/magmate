import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilPrestataireComponent } from './accueil-prestataire.component';

describe('AccueilPrestataireComponent', () => {
  let component: AccueilPrestataireComponent;
  let fixture: ComponentFixture<AccueilPrestataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccueilPrestataireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilPrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
