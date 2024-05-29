import { API_URL } from '../../ENV';
import { TMovie } from '../types/movie';
import { TSection } from '../types/section';
import { TUser } from '../types/user';

// MOVIE

export const getMovieById = async (id: number): Promise<TMovie> => {
    return await fetch('http://' + API_URL + `/movie/byId?id=${id}`, {
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

// HOMEPAGE

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
        .catch((err) => {
            console.log(err);
        });
};

export const createHomepage = async (id: number): Promise<void> => {
    return await fetch('http://' + API_URL + `/homepage/create?id=${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            return;
        })
        .catch((err) => {
            return;
        });
};

// USER

export const getUserById = async (id: number): Promise<TUser | undefined> => {
    return await fetch('http://' + API_URL + `/user/byId?id=${id}`, {
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

export const loginUser = async (credentials: {
    username: string;
    password: string;
}): Promise<TUser | undefined> => {
    return await fetch('http://' + API_URL + `/user/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
        .then((response) => response.json())
        .then((json) => {
            return json.data;
        })
        .catch((err) => {
            return undefined;
        });
};

export const createUser = async (user: TUser): Promise<TUser | undefined> => {
    return await fetch('http://' + API_URL + `/user/insert`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((response) => response.json())
        .then((json) => {
            return json.data;
        })
        .catch((err) => {
            return undefined;
        });
};
