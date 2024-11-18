import { StyleSheet, View, Image, Text, ImageProps } from 'react-native';
import { useAppStore } from '../../stores/appStores';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';
import { RadialGradient } from '../Basics/RadialGradient';
import { Label } from '../Label/Label';
import { useEffect, useState } from 'react';
import { TMovie, TMovieUserPref } from '../../types/movie';
import { DetailButton, DetailButtonProps } from '../DetailButton/DetailButton';
import { DetailButtonType } from '../../enums/detail';
import { LinearGradient } from '../Basics/LinearGradient';
import { Rating } from '../Rating/Rating';
import { RouteNames } from '../../enums/navigation';
import { formatDuration } from '../../helpers/duration';

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '60%',
        flexDirection: 'row',
    },
    imageContainer: {
        height: '100%',
        width: '65%',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: -1,
    },
    textContainer: {
        height: '100%',
        width: '50%',
        paddingLeft: hScale(180),
        paddingTop: vScale(70),
        gap: vScale(20),
    },
    title: {
        color: AppColors.white,
        fontSize: vScale(70),
    },
    text: {
        color: AppColors.white60,
        fontSize: vScale(30),
    },
    buttonsContainer: {
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        gap: hScale(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const gradientColors = [
    { offset: '60%', color: AppColors.background, opacity: '0' },
    { offset: '75%', color: AppColors.background, opacity: '0.5' },
    { offset: '100%', color: AppColors.background, opacity: '1' },
];

export interface DetailPreviewProps {
    movie: TMovie;
    movieUserPref: TMovieUserPref;
    onClick: (buttonType: DetailButtonType) => void;
}

export const DetailPreview = ({
    movie,
    movieUserPref,
    onClick,
}: DetailPreviewProps): JSX.Element => {
    const [imageURL, setImageURL] = useState<ImageProps>();
    const [actorsList, setActorsList] = useState<string>('');
    const navigation = useAppStore((state) => state.navigation);
    const movieHeader = [
        movie.movie_country,
        movie.movie_release_year,
        formatDuration(movie.movie_duration),
        movie.movie_genre,
    ].join(' · ');

    const BUTTONS: DetailButtonProps[] = [
        {
            icon: DetailButtonType.Play,
            text: 'Guarda',
            onPress: () => {
                navigation.navigate({
                    name: RouteNames.PlayerPage,
                    params: {},
                });
            },
        },
        {
            icon: DetailButtonType.Like,
            text: 'Mi Piace',
            onPress: () => {
                onClick(DetailButtonType.Like);
            },
        },
        {
            icon: DetailButtonType.Dislike,
            text: 'Non fa per me',
            onPress: () => {
                onClick(DetailButtonType.Dislike);
            },
        },
        {
            icon: DetailButtonType.Bookmark,
            text: 'Aggiungi ai preferiti',
            onPress: () => {
                onClick(DetailButtonType.Bookmark);
            },
        },
    ];

    useEffect(() => {
        setImageURL(
            movie.movie_image_url
                ? { uri: movie.movie_image_url }
                : require('./../../assets/images/placeholder.png')
        );
        let actors = '';
        movie?.movie_actors.split(',').forEach((actor, index) => {
            if (index != 0) {
                actors = actors + ', ';
            }
            actors = actors + actor;
        });
        setActorsList(actors);
    }, []);

    return (
        <>
            <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }}
            >
                <LinearGradient
                    x1={'100%'}
                    x2={'35%'}
                    y1={'100%'}
                    y2={'100%'}
                    colorList={gradientColors}
                />
                <View style={style.imageContainer}>
                    <Image
                        source={imageURL}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                        }}
                        resizeMode="cover"
                    />
                </View>
            </View>

            <View style={style.container}>
                <View style={style.textContainer}>
                    <Text style={style.title} numberOfLines={1}>
                        {movie.movie_title}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: hScale(20),
                        }}
                    >
                        <Rating rating={movie.movie_popularity} />
                        <Text style={style.text}>{movieHeader}</Text>
                    </View>

                    <Text style={[style.text, { color: AppColors.white }]}>
                        {movie.movie_description}
                    </Text>
                    <Text style={style.text} numberOfLines={1}>
                        Diretto da: {movie.director_name}
                    </Text>
                    <Text style={style.text} numberOfLines={3}>
                        Cast: {actorsList}
                    </Text>
                </View>
            </View>
            <View style={style.buttonsContainer}></View>
            <View style={style.buttonsContainer}>
                {BUTTONS.map((button, index) => {
                    return (
                        <View key={'detButton_' + index}>
                            <DetailButton
                                icon={button.icon}
                                onPress={button.onPress}
                                text={button.text}
                                movieUserPref={movieUserPref}
                            />
                        </View>
                    );
                })}
            </View>
        </>
    );
};
