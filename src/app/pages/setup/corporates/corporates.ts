import { Details } from '../details';

export interface ICorporates {
    id?: string;
    name: string;
    details: Details;
    isactive: string;
    createdby: number;
    createddatetime: any;
    updatedby: number
    updateddatetime: any;
    

}

export class Corporates implements ICorporates {
    constructor(public id: string, public name: string, public details: Details,  
        public isactive: string, public createdby: number, public createddatetime: any, public updatedby: number,
        public updateddatetime: any) {

    }
} 




// export interface User {
//     name: string; // required with minimum 5 chracters
//     address?: {
//         street?: string; // required
//         postcode?: string;
//     }
// }