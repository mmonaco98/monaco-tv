import { TGender } from '../enums/user';

export interface TUser {
    name: string;
    id: number;
    mail: string;
    gender: TGender;
    age: number;
    avatar: string;
}
