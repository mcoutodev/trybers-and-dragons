import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Ranger extends Archetype {
  private readonly _energyType: EnergyType;
  private static _createdInstances = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'stamina';
    Ranger._createdInstances += 1;
  }

  get energyType(): EnergyType { return this._energyType; }

  static override createdArchetypeInstances(): number {
    return Ranger._createdInstances;
  }
}
