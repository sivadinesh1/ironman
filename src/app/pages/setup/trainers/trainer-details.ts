import { User } from '../user';


export interface ITrainerDetails {
    id?: any;
    trainuser: User;

    level: string;
    trainerfee: number;
    createdby: number;
    createddatetime: any;
    updatedby: number
    updateddatetime: any;

}

export class TrainerDetails implements ITrainerDetails {
    constructor(public id: any,
        public trainuser: User,
        public level: string,
        public trainerfee: number,

        public createdby: number,
        public createddatetime: any,
        public updatedby: number,
        public updateddatetime: any
    ) {

    }
}




