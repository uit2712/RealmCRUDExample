export default class Hero {
    heroId: number;
    heroName: string;
    powers: [];

    constructor(heroId: number, heroName: string, powers = []) {
        this.heroId = heroId;
        this.heroName = heroName;
        this.powers = powers;
    }

    getPowersArrayInfo() {
        if (!(this.powers instanceof Array) || this.powers.length == 0)
            return [];

        let result = [];
        for (let i = 0; i < this.powers.length; i++)
            if (this.powers[i])
                result.push(this.powers[i].getObjectInfo());

        return result;
    }

    getObjectInfo() {
        return {
            heroId: this.heroId,
            heroName: this.heroName,
            powers: this.getPowersArrayInfo()
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