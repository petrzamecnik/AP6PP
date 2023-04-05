import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveDeckModalComponent } from './remove-deck-modal.component';

describe('RemoveDeckModalComponent', () => {
  let component: RemoveDeckModalComponent;
  let fixture: ComponentFixture<RemoveDeckModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveDeckModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveDeckModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
