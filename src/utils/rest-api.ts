import { API_URL } from '../../ENV';
import { TMovie } from '../types/movie';

export const getMovieById = async (id: number): Promise<TMovie> => {
    return await fetch('http://' + API_URL + `/getMovieData/byId?id=${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            return json.data;
        })
        .catch(() => {});
};
