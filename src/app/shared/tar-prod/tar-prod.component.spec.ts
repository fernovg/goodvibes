import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarProdComponent } from './tar-prod.component';

describe('TarProdComponent', () => {
  let component: TarProdComponent;
  let fixture: ComponentFixture<TarProdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarProdComponent]
    });
    fixture = TestBed.createComponent(TarProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
