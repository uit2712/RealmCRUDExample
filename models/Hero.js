export default class Hero {
    heroId: number;
    heroName: string;
    powers: [];

    constructor(heroId = 0, heroName = '', powers = []) {
        this.heroId = heroId;
        this.heroName = heroName;
        this.powers = powers;
    }

    getObjectInfo() {
        return {
            heroId: this.heroId,
            heroName: this.heroName,
            powers: this.powers
        }
    }
}

const HeroSchema = {
    name: "Hero",
    properties: {
        heroId: "int",
        heroName: "string",
        powers: { type: "list", objectType: "Power" }
    }
}

Hero.schema = HeroSchema;