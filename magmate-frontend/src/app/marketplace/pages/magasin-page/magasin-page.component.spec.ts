import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagasinPageComponent } from './magasin-page.component';

describe('MagasinPageComponent', () => {
  let component: MagasinPageComponent;
  let fixture: ComponentFixture<MagasinPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MagasinPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagasinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
