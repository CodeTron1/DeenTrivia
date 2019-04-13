import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatogoryPage } from './catogory.page';

describe('CatogoryPage', () => {
  let component: CatogoryPage;
  let fixture: ComponentFixture<CatogoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatogoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatogoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
