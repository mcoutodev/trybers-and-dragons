import Race from './Race';

export default class Orc extends Race {
  private static _createdInstances = 0;
  private readonly _maxLifePoints: number;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    this._maxLifePoints = 74;
    Orc._createdInstances += 1;
  }

  get maxLifePoints(): number { return this._maxLifePoints; }

  static override createdRacesInstances(): number {
    return Orc._createdInstances;
  }
}
