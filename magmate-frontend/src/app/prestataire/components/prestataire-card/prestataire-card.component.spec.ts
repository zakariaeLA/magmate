import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestataireCardComponent } from './prestataire-card.component';

describe('PrestataireCardComponent', () => {
  let component: PrestataireCardComponent;
  let fixture: ComponentFixture<PrestataireCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrestataireCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestataireCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
