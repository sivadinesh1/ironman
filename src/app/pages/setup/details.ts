import { Address } from './address';
import { Contact } from './contact';

export interface IDetails {
    address: Address,
    contact: Contact
}

export class Details implements IDetails {
    constructor(public address: Address, public contact: Contact) {

    }
} 