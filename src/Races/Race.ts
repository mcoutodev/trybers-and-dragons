export default abstract class Race {
  protected readonly _name: string;
  protected readonly _dexterity: number;

  constructor(name: string, dexterity: number) {
    this._name = name;
    this._dexterity = dexterity;
  }

  get name() { return this._name; }

  get dexterity() { return this._dexterity; }

  abstract get maxLifePoints(): number;

  static createdRacesInstances(): number {
    throw new Error('Not implemented');
  }
}
