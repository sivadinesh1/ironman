export interface IAddress {
    name: string;
    line1: string;
    line2: string;
    city: string;
    pincode: string;
    

}

export class Address implements IAddress {
    constructor(public name: string, public line1: string, public line2: string,
        public city: string, public pincode: string) {

    }
} 