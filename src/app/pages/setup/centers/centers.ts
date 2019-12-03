import { Details } from '../details';
import { Corporates } from '../corporates/corporates';

export interface ICenters {
    id?: string;
    name: string;
    corporate: Corporates;
    details: Details;
    isactive: string;
    createdby: number;
    createddatetime: any;
    updatedby: number
    updateddatetime: any;
    

}

export class Centers implements ICenters {
    constructor(public id: string, public corporate: Corporates, public name: string, public details: Details,  
        public isactive: string, public createdby: number, public createddatetime: any, public updatedby: number,
        public updateddatetime: any) {

    }
} 