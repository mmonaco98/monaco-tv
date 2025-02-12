import { API_URL } from '../../ENV';
import { TMovie, TUserMovie } from '../types/movie';
import { TSection } from '../types/section';
import { TCredentials, TUser } from '../types/user';

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

export const searchMoviebyTitle = async (title: string): Promise<TMovie[]> => {
    return await fetch('http://' + API_URL + `/search/byTitle?title=${title}`, {
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

// FAVOURITE

export const isFavouriteMovie = async (
    params: TUserMovie
): Promise<boolean> => {
    return await fetch(
        'http://' +
            API_URL +
            `/favourite/isFavourite?user_id=${params.user_id}&movie_id=${params.movie_id}`,
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
            return json.isFavourite;
        })
        .catch(() => {});
};

export const addFavouriteMovie = async (
    params: TUserMovie
): Promise<boolean> => {
    return await fetch('http://' + API_URL + `/favourite/addFavourite`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
        .then((response) => {
            return true;
        })
        .catch((err) => {
            return false;
        });
};

export const removeFavouriteMovie = async (
    params: TUserMovie
): Promise<boolean> => {
    return await fetch('http://' + API_URL + `/favourite/removeFavourite`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
        .then((response) => {
            return true;
        })
        .catch((err) => {
            return false;
        });
};

export const getFavouriteMovie = async (
    user_id: number
): Promise<TSection[]> => {
    return await fetch(
        'http://' + API_URL + `/favourite/getFavourite?user_id=${user_id}`,
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

// LIKED

export const isLikedMovie = async (params: TUserMovie): Promise<boolean> => {
    return await fetch(
        'http://' +
            API_URL +
            `/liked/isLiked?user_id=${params.user_id}&movie_id=${params.movie_id}`,
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
            return json.isLiked;
        })
        .catch(() => {});
};

export const addLikedMovie = async (params: TUserMovie): Promise<boolean> => {
    return await fetch('http://' + API_URL + `/liked/addLiked`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
        .then((response) => {
            return true;
        })
        .catch((err) => {
            return false;
        });
};

export const removeLikedMovie = async (
    params: TUserMovie
): Promise<boolean> => {
    return await fetch('http://' + API_URL + `/liked/removeLiked`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
        .then((response) => {
            return true;
        })
        .catch((err) => {
            return false;
        });
};

// DISLIKED

export const isDislikedMovie = async (params: TUserMovie): Promise<boolean> => {
    return await fetch(
        'http://' +
            API_URL +
            `/disliked/isDisliked?user_id=${params.user_id}&movie_id=${params.movie_id}`,
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
            return json.isDisliked;
        })
        .catch(() => {});
};

export const addDislikedMovie = async (
    params: TUserMovie
): Promise<boolean> => {
    return await fetch('http://' + API_URL + `/disliked/addDisliked`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
        .then((response) => {
            return true;
        })
        .catch((err) => {
            return false;
        });
};

export const removeDislikedMovie = async (
    params: TUserMovie
): Promise<boolean> => {
    return await fetch('http://' + API_URL + `/disliked/removeDisliked`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
        .then((response) => {
            return true;
        })
        .catch((err) => {
            return false;
        });
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
        method: 'POST',
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

export const loginUser = async (
    credentials: TCredentials
): Promise<TUser | undefined> => {
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
        method: 'POST',
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
