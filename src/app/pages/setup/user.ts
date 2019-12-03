import { Centers } from './centers/centers';
import { Corporates } from './corporates/corporates';

export interface IUser {
    id?: any;
    username: string;
    password: string;
    name: string;
    center: Centers;
    corporate: Corporates;
    role: string;

    firstname: string;
    mobilenumber: string;
    profileimgurl: string;
    social_id: string;
    status: string;
    email: string;
    verified: string;
    gender: string;
    dob: string;
    signup_mode: string;
    
    createdby: number;
    createddatetime: any;
    updatedby: number
    updateddatetime: any;

}

export class User implements IUser {
    constructor(public id: any, 
        public username: string,
        public password: string,
        public name: string,
        public center: Centers,
        public corporate: Corporates,
        public role: string,
    
        public firstname: string,
        public mobilenumber: string,
        public profileimgurl: string,
        public social_id: string,
        public status: string,
        public email: string,
        public verified: string,
        public gender: string,
        public dob: string,
        public signup_mode: string,
        
        public createdby: number,
        public createddatetime: any,
        public updatedby: number,
        public updateddatetime: any
        ) {

    }
}


