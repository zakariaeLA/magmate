import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonProfilPrestataireComponent } from './mon-profil-prestataire.component';

describe('MonProfilPrestataireComponent', () => {
  let component: MonProfilPrestataireComponent;
  let fixture: ComponentFixture<MonProfilPrestataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonProfilPrestataireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonProfilPrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
