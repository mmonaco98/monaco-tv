import { StyleSheet, View } from 'react-native';
import { AppColors } from '../enums/colors';
import { TDetailPageProps } from '../types/navigation';
import { DetailPreview } from '../components/DetailPreview/DetailPreview';
import { useEffect, useState } from 'react';
import { TMovie, TMovieUserPref, TUserMovie } from '../types/movie';
import {
    addDislikedMovie,
    addFavouriteMovie,
    addLikedMovie,
    getMovieById,
    isDislikedMovie,
    isFavouriteMovie,
    isLikedMovie,
    removeDislikedMovie,
    removeFavouriteMovie,
    removeLikedMovie,
} from '../utils/rest-api';
import { Flow } from '../components/Loaders/Loaders';
import { hScale } from '../helpers/sizeHelper';
import { useAppStore } from '../stores/appStores';
import { DetailButtonType } from '../enums/detail';

const style = StyleSheet.create({
    detailPage: {
        width: '100%',
        height: '100%',
        backgroundColor: AppColors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const DetailPage = ({ route }: TDetailPageProps): JSX.Element => {
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [movie, setMovie] = useState<TMovie>();
    const [movieUserPref, setMovieUserPref] = useState<TMovieUserPref>();
    const movie_id = route.params.movie_id;
    const user = useAppStore((state) => state.userInfo);
    const apiParams: TUserMovie = { movie_id: movie_id, user_id: user.id };

    useEffect(() => {
        getMovieById(movie_id)
            .then(async (res) => {
                setMovie(res);
                const [isLiked, isDisliked, isFavourite] = await Promise.all([
                    isLikedMovie(apiParams),
                    isDislikedMovie(apiParams),
                    isFavouriteMovie(apiParams),
                ]);
                setMovieUserPref({
                    isDisliked: isDisliked,
                    isLiked: isLiked,
                    isFavourite: isFavourite,
                });
                setTimeout(() => {
                    setIsFetching(false);
                }, 800);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const onClick = async (buttonType: DetailButtonType) => {
        const apiParams = { movie_id: movie.movie_id, user_id: user.id };
        let newMovieUserPref: TMovieUserPref = movieUserPref;
        switch (buttonType) {
            case DetailButtonType.Like:
                if (!movieUserPref.isLiked) {
                    await addLikedMovie(apiParams);
                    if (movieUserPref.isDisliked) {
                        await removeDislikedMovie(apiParams);
                        newMovieUserPref = {
                            ...newMovieUserPref,
                            isDisliked: !movieUserPref.isDisliked,
                        };
                    }
                } else {
                    await removeLikedMovie(apiParams);
                }
                newMovieUserPref = {
                    ...newMovieUserPref,
                    isLiked: !movieUserPref.isLiked,
                };
                break;
            case DetailButtonType.Dislike:
                if (!movieUserPref.isDisliked) {
                    await addDislikedMovie(apiParams);
                    if (movieUserPref.isLiked) {
                        await removeLikedMovie(apiParams);
                        newMovieUserPref = {
                            ...newMovieUserPref,
                            isLiked: !movieUserPref.isLiked,
                        };
                    }
                } else {
                    await removeDislikedMovie(apiParams);
                }
                newMovieUserPref = {
                    ...newMovieUserPref,
                    isDisliked: !movieUserPref.isDisliked,
                };
                break;
            case DetailButtonType.Bookmark:
                if (!movieUserPref.isFavourite) {
                    await addFavouriteMovie(apiParams);
                } else {
                    await removeFavouriteMovie(apiParams);
                }
                newMovieUserPref = {
                    ...newMovieUserPref,
                    isFavourite: !movieUserPref.isFavourite,
                };
                break;
        }
        setMovieUserPref(newMovieUserPref);
    };

    return (
        <>
            <View style={style.detailPage}>
                {isFetching && (
                    <Flow
                        size={hScale(100)}
                        colors={['#ff5726', '#ff6c27', '#ff8325']}
                    />
                )}
                {!isFetching && (
                    <DetailPreview
                        movie={movie}
                        onClick={onClick}
                        movieUserPref={movieUserPref}
                    />
                )}
            </View>
        </>
    );
};
