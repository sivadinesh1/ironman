import { Centers } from '../centers/centers';

export interface IServiceSubCategory {
    id?: number;
    name: string;
    description: string;
    center: Centers;
    isactive: string;
    createdby: number;
    createddatetime: any;
    updatedby: number
    updateddatetime: any;
}

export class ServiceSubCategory implements IServiceSubCategory {
    constructor(public id: number, public name: string, public description: string, public center: Centers,
        public isactive: string, public createdby: number, public createddatetime: any, public updatedby: number,
        public updateddatetime: any) {

    }
}


