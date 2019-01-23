export default class Power {
    powerId: number;
    powerName: string;

    constructor(powerId = 0, powerName = '') {
        this.powerId = powerId;
        this.powerName = powerName;
    }
}