export interface ICorporates {
    id?: string;
    name: string;
    line1: string;
    line2: string;
    state: string;
    pincode: string;
    phone: string;
    email: string;

}

export class Corporates implements ICorporates {
    constructor(public name: string, public line1: string, public line2: string,
        public state: string, public pincode: string, public phone: string, public email: string) {

        }
}