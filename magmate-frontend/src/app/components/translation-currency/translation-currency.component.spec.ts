import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationCurrencyComponent } from './translation-currency.component';

describe('TranslationCurrencyComponent', () => {
  let component: TranslationCurrencyComponent;
  let fixture: ComponentFixture<TranslationCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslationCurrencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslationCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
