import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMagasinClientComponent } from './page-magasin-client.component';

describe('PageMagasinClientComponent', () => {
  let component: PageMagasinClientComponent;
  let fixture: ComponentFixture<PageMagasinClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageMagasinClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageMagasinClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
