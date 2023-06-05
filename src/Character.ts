import Archetype, { Necromancer, Warrior, Ranger, Mage } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Dwarf, Halfling, Orc, Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _energy: Energy;
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _dexterity: number;

  constructor(
    name: string,
    race = 'elf',
    archetype = 'mage',
  ) {
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._dexterity = getRandomInt(1, 10);
    this._race = this.setRace(name, race);
    this._archetype = this.setArchetype(archetype);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._energy = {
      amount: getRandomInt(1, 10),
      type_: this._archetype.energyType,
    };
  }

  get lifePoints() { return this._lifePoints; }

  get strength() { return this._strength; }

  get defense() { return this._defense; }

  get energy(): Energy { return { ...this._energy }; }

  get name() { return this._race.name; }

  get race() { return this._race; }

  get archetype() { return this._archetype; }

  get dexterity() { return this._dexterity; }

  private setRace(name: string, race: string) {
    switch (race) {
      case 'dwarf':
        return new Dwarf(name, this._dexterity);
      case 'halfling':
        return new Halfling(name, this._dexterity);
      case 'orc':
        return new Orc(name, this._dexterity);
      default:
        return new Elf(name, this._dexterity);
    }
  }

  private setArchetype(archetype: string) {
    switch (archetype) {
      case 'necromancer':
        return new Necromancer(this._race.name);
      case 'warrior':
        return new Warrior(this._race.name);
      case 'ranger':
        return new Ranger(this._race.name);
      default:
        return new Mage(this._race.name);
    }
  }

  attack(enemy: SimpleFighter | Fighter): void {
    enemy.receiveDamage(this._strength);
  }

  special(enemy: SimpleFighter | Fighter): void {
    enemy.receiveDamage(this._strength + getRandomInt(1, 10));
    this._energy.amount -= 2;
  }

  levelUp(): void {
    this._maxLifePoints += getRandomInt(1, 10);
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._energy.amount = 10;
    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }
    this._lifePoints = this._maxLifePoints;
  }

  receiveDamage(attackPoints: number): number {
    if ((attackPoints - this._defense) > 0) {
      this._lifePoints -= attackPoints - this._defense;
    } else {
      this._lifePoints -= 1;
    }
    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }
    return this._lifePoints;
  }
}
