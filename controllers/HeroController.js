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

const generateId = () => {
    let heroes = getAllHeroes().result;
    if (heroes.length == 0)
        return 1;

    heroes = heroes.sorted('heroId', true); // sorted descending
    let lastHero = heroes[0];
    if (lastHero)
        return lastHero['heroId'] + 1;

    return 1;
}

const checkIfExist = (id: number) => {
    return getHeroById(id).result != null;
}

export const createNewHero = (hero: Hero) => {
    let result = new Message();
    if (!hero) {
        result.result = false;
        result.message = 'Invalid hero data!';
        return result;
    }

    hero.heroId = generateId();
    if (checkIfExist(hero.heroId)) {
        result.result = false;
        result.message = `Hero with Id=${hero.heroId} exists`;
        return result;
    }

    try {
        realm.write(() => {
            realm.create('Hero', hero.getObjectInfo());
        });
        result.result = true;
        result.message = 'Create new hero successful!';
    } catch (e) {
        result.result = false;
        result.message = `${e.message}`;
    } finally {
        return result;
    }
}

export const updateHero = (hero: Hero) => {
    let result = new Message();
    if (!hero) {
        result.result = false;
        result.message = 'Invalid hero data!';
        return result;
    }

    let findHero = getHeroById(hero.heroId).result;
    if (!findHero) {
        result.result = false;
        result.message = `Hero with Id=${hero.heroId} doesn't exist`;
        return result;
    }

    try {
        realm.write(() => {
            hero.updateInfoForObject(findHero);
        });
        result.result = true;
        result.message = `Update hero with Id=${hero.heroId} successful!`;
    } catch (e) {
        result.result = false;
        result.message = `${e.message}`;
    } finally {
        return result;
    }
}

export const deleteHeroById = (id: number) => {
    let result = new Message();
    let findHero = getHeroById(id).result;
    if (!findHero) {
        // not found hero with id
        result.result = false;
        result.message = `Hero with Id=${id} doesn't exist`;
        return result;
    }

    try {
        realm.write(() => {
            realm.delete(findHero);
        });
        result.result = true;
        result.message = `Delete hero with Id=${id} successful!`;
    } catch (e) {
        result.result = false;
        result.message = `${e.message}`;
    } finally {
        return result;
    }
}