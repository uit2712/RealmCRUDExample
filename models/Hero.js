export default class Hero {
    heroId: number;
    heroName: string;
    powers: [];

    constructor(heroId = 0, heroName = '', powers = []) {
        this.heroId = heroId;
        this.heroName = heroName;
        this.powers = powers;
    }
}