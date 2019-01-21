import Hero from '../models/Hero';
import Power from '../models/Power';
import Message from '../models/Message';

let Realm = require('realm');
let realm = new Realm({ path: "hero.realm", schema: [Power.schema, Hero.schema] });

export const getAllPowers = () => {
    let result = new Message();
    try {
        result.result = realm.objects('Power');
        result.message = "Get all powers successful!";
    } catch (e) {
        result.result = [];
        result.message = "Get all powers failed!";
    } finally {
        return result;
    }
}

export const getPowerById = (id: number) => {
    let result = new Message();

    let powers = getAllPowers().result;
    let findPower = powers.filtered(`powerId = ${id}`);
    if (findPower.length > 0) {
        result.message = `Find 1 power with Id=${id}`;
        result.result = findPower[0];
        return result;
    }

    result.result = null;
    result.message = `Not found power with Id=${id}`;
    return result;
}

const generateId = () => {
    let powers = getAllPowers().result;
    if (powers.length == 0)
        return 1;

    powers = powers.sorted('powerId', true); // sorted descending
    let lastPower = powers[0];
    if (lastPower)
        return lastPower['powerId'] + 1;

    return 1;
}

const checkIfExist = (id: number) => {
    return getPowerById(id).result != null;
}

export const createNewPower = (power: Power) => {
    let result = new Message();
    if (!power) {
        result.result = false;
        result.message = 'Invalid power data!';
        return result;
    }

    power.powerId = generateId();
    if (checkIfExist(power.powerId)) {
        result.result = false;
        result.message = `Power with Id=${power.powerId} exists`;
        return result;
    }

    try {
        realm.write(() => {
            realm.create('Power', power.getObjectInfo());
        });
        result.result = true;
        result.message = 'Create new power successful!';
    } catch (e) {
        result.result = false;
        result.message = `${e.message}`;
    } finally {
        return result;
    }
}

export const deletePowerById = (id: number) => {
    let result = new Message();
    let findPower = getPowerById(id).result;
    if (!findPower) {
        // not found power with id
        result.result = false;
        result.message = `Power with Id=${id} doesn't exist`;
        return result;
    }

    try {
        realm.write(() => {
            realm.delete(findPower);
        });
        result.result = true;
        result.message = `Delete power with Id=${id} successful!`;
    } catch (e) {
        result.result = false;
        result.message = `${e.message}`;
    } finally {
        return result;
    }
}

export const updatePower = (power: Power) => {
    let result = new Message();
    if (!power) {
        result.result = false;
        result.message = 'Invalid power data!';
        return result;
    }

    let findPower = getPowerById(power.powerId).result;
    if (!findPower) {
        result.result = false;
        result.message = `Power with Id=${power.powerId} doesn't exist`;
        return result;
    }

    try {
        realm.write(() => {
            power.updateInfoForPowerObject(findPower);
        });
        result.result = true;
        result.message = `Update power with Id=${power.powerId} successful!`;
    } catch (e) {
        result.result = false;
        result.message = `${e.message}`;
    } finally {
        return result;
    }
}