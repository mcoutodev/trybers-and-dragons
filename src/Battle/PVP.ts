import Fighter from '../Fighter';
import Battle from './Battle';

export default class PVP extends Battle {
  private opponent: Fighter;

  constructor(player: Fighter, opponent: Fighter) {
    super(player);
    this.opponent = opponent;
  }

  override fight(): number {
    const p1 = this.player;
    const p2 = this.opponent;
    while (p1.lifePoints >= 0) {
      p1.attack(p2);
      if (p2.lifePoints === -1) {
        return 1;
      }
      p2.attack(p1);
    }
    return -1;
  }
}
