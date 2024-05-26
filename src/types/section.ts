import { CardTypes } from '../enums/cards';
import { TMovie } from './movie';

export type TSection = {
    sectionTitle: string;
    movies: TMovie[];
    type: CardTypes;
};
