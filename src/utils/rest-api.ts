import { API_URL } from '../../ENV';
import { TMovie } from '../types/movie';
import { TSection } from '../types/section';
import { TUser } from '../types/user';

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

export const getHomepageByUserId = async (id: number): Promise<TSection[]> => {
    return await fetch(
        'http://' + API_URL + `/homepage/byUserId?userId=${id}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
    )
        .then((response) => response.json())
        .then((json) => {
            return json.data;
        })
        .catch(() => {});
};

export const getUserById = async (id: number): Promise<TUser | undefined> => {
    return await fetch('http://' + API_URL + `/users/byId?id=${id}`, {
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
        .catch((err) => {
            return undefined;
        });
};
