import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { HeroService } from '../hero.service';
// tslint:disable-next-line: import-blacklist
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

describe('HerosComponent (Deep test)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

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
        HeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValues(of(HEROES));

    // runs ngOnInit
    fixture.detectChanges();

    const heroComponentDebugElement = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentDebugElement.length).toBe(3);
  });

  it('should render correct hero as HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValues(of(HEROES));

    // runs ngOnInit
    fixture.detectChanges();

    const heroComponentDebugElement = fixture.debugElement.queryAll(By.directive(HeroComponent));
    const heroName = heroComponentDebugElement[0].componentInstance.hero.name;
    expect(heroName).toEqual('SuperDude');
  });

  it(`should call the heroService.deleteHero when the
    Hero component's delete button is clicked`, () => {
      // keep eye on the delete method of the component.
      spyOn(fixture.componentInstance, 'delete');
      mockHeroService.getHeroes.and.returnValues(of(HEROES));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponents[0].query(By.css('button')).triggerEventHandler('click', { stopPropagation: () => {}});
      expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it(`should call the heroService.deleteHero when the
    Hero component's delete event is invoked`, () => {
      // keep eye on the delete method of the component.
      spyOn(fixture.componentInstance, 'delete');
      mockHeroService.getHeroes.and.returnValues(of(HEROES));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

      expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });
});
