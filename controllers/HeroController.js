import Hero from '../models/Hero';
import Power from '../models/Power';
import Message from '../models/Message';

let Realm = require('realm');
let realm = new Realm({ path: "hero.realm", schema: [Power.schema, Hero.schema] });

export const getAllHeroes = () => {
    let result = new Message();
    try {
        result.result = realm.objects('Hero');
        result.message = "Get all heroes successful!";
    } catch (e) {
        result.result = [];
        result.message = "Get all heroes failed!";
    } finally {
        return result;
    }
}

export const getHeroById = (id: number) => {
    let result = new Message();

    let heroes = getAllHeroes().result;
    let findHero = heroes.filtered(`heroId = ${id}`);
    if (findHero.length > 0) {
        result.message = `Find 1 hero with Id=${id}`;
        result.result = findHero[0];
        return result;
    }

    result.result = null;
    result.message = `Not found hero with Id=${id}`;
    return result;
}