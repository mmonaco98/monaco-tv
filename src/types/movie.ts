export interface TMovie {
    movie_id: number;
    movie_title: string;
    movie_release_year: number;
    movie_description: string;
    movie_url: string;
    movie_title_language: string;
    movie_popularity: number;
    movie_image_url: string;
    director_id: number;
    director_name: string;
    director_url: string;
    movie_actors?: string;
    movie_country?: string;
    movie_genre?: string;
    movie_language?: string;
    movie_duration?: number;
}

export interface TUserMovie {
    movie_id: number;
    user_id: number;
    isFavourite?: boolean;
    message?: string;
    data?: any;
}

export interface TMovieUserPref {
    isFavourite: boolean;
    isLiked: boolean;
    isDisliked: boolean;
}
