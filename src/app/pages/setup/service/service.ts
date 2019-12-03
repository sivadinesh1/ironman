import { Centers } from '../centers/centers';
import { ServiceSubCategory } from '../sscategory/servicesubcategory';
import { ServiceCategory } from './servicecategory';

export interface IService {
    id?: number;
    center_id: Centers;
    name: string;
    description: string;
    service_category_id: ServiceCategory;
    service_sub_category_id: ServiceSubCategory;

    isactive: string;
    units_in_stock: number;
    createdby: number;
    createddatetime: any;
    updatedby: number
    updateddatetime: any;
}

export class Service implements IService {


    constructor(
        public center_id: Centers,
        public service_category_id: ServiceCategory,
        public service_sub_category_id: ServiceSubCategory,
        public units_in_stock: number,

        public id: number, public name: string, public description: string, public center: Centers,
        public isactive: string, public createdby: number, public createddatetime: any, public updatedby: number,
        public updateddatetime: any) {

    }
}


