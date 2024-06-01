import { StyleSheet, View } from 'react-native';
import { AppColors } from '../enums/colors';
import { TDetailPageProps } from '../types/navigation';
import { DetailPreview } from '../components/DetailPreview/DetailPreview';
import { useEffect, useState } from 'react';
import { TMovie } from '../types/movie';
import { getMovieById } from '../utils/rest-api';
import { Flow } from '../components/Loaders/Loaders';
import { hScale } from '../helpers/sizeHelper';

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
    const movie_id = route.params.movie_id;

    useEffect(() => {
        getMovieById(movie_id)
            .then((res) => {
                setMovie(res);
                setTimeout(() => {
                    setIsFetching(false);
                }, 800);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <View style={style.detailPage}>
                {isFetching && (
                    <Flow
                        size={hScale(100)}
                        colors={['#ff5726', '#ff6c27', '#ff8325']}
                    />
                )}
                {!isFetching && <DetailPreview movie={movie} />}
            </View>
        </>
    );
};
