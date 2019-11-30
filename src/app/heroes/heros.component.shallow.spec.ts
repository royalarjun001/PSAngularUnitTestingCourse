import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';

describe('HerosComponent (shallow test)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  // creating a mock child component
  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  class FakeHeroComponent {
    @Input() hero: any;
  }

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SuperDude', strength: 8},
      { id: 2, name: 'Wonder woman', strength: 24},
      { id: 3, name: 'Super Dude', strength: 55},
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHeros', 'deleteHeroes']);
    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        FakeHeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set the heros correctly from service', () => {
    // mocking get heros service calls
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges(); // this will call ng-on-init

    expect(fixture.componentInstance.heroes.length).toBe(HEROES.length);
  });
});
