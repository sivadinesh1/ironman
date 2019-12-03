export interface IContact {
    phone: string;
    email: string;

}

export class Contact implements IContact {
    constructor(public phone: string, public email: string) {

    }
} 