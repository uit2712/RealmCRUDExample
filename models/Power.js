export default class Power {
    powerId: number;
    powerName: string;

    constructor(powerId = 0, powerName = '') {
        this.powerId = powerId;
        this.powerName = powerName;
    }

    getObjectInfo() {
        return {
            powerId: this.powerId,
            powerName: ''.includes(this.powerName) ? undefined : this.powerName
        };
    }

    clone() {
        return new Power(this.powerId, this.powerName);
    }

    updateInfoForPowerObject(power: any) {
        power['powerName'] = this.powerName;
    }
}

const PowerSchema = {
    name: "Power",
    properties: {
        powerId: "int",
        powerName: "string"
    }
}

Power.schema = PowerSchema;