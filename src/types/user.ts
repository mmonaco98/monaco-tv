import { TGender } from '../enums/user';

export interface TUser {
    name: string;
    id: number;
    mail: string;
    gender: TGender;
    age: number;
    avatar: string;
    password: string;
    username: string;
}

export interface TCredentials {
    username: string;
    password: string;
}
