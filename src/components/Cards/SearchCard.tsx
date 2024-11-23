import { StyleSheet, View, Image, Pressable, Text } from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';
import { useState } from 'react';
import { TMovie } from '../../types/movie';
import { useAppStore } from '../../stores/appStores';
import { RouteNames } from '../../enums/navigation';
import { formatDuration } from '../../helpers/duration';

const style = StyleSheet.create({
    searchCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: hScale(30),
    },
    cardWrapper: {
        width: hScale(428),
        height: vScale(248),
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hScale(15),
    },
    focused: {
        backgroundColor: AppColors.white,
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hScale(10),
    },
    img: {
        width: hScale(418),
        height: hScale(238),
        borderRadius: hScale(10),
    },
    textColor: {
        color: AppColors.black80,
    },
    textColorFocused: {
        color: AppColors.white80,
    },
    titleText: {
        fontSize: vScale(35),
        width: hScale(500),
    },
    directorText: {
        fontSize: vScale(25),
    },
    infoText: {
        fontSize: vScale(20),
    },
});

interface SearchCardProps {
    item: TMovie;
    onFocus: () => void;
}

export const SearchCard = ({ item, onFocus }: SearchCardProps): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false);
    const navigation = useAppStore((state) => state.navigation);

    return (
        <>
            <View style={style.searchCard}>
                <Pressable
                    onFocus={() => {
                        setFocused(true);
                        onFocus();
                    }}
                    onBlur={() => {
                        setFocused(false);
                    }}
                    onPress={() => {
                        navigation.navigate({
                            name: RouteNames.DetailPage,
                            params: {
                                movie_id: item.movie_id,
                            },
                        });
                    }}
                >
                    <View style={[style.cardWrapper, focused && style.focused]}>
                        <View style={style.card}>
                            <Image
                                source={{
                                    uri:
                                        item.movie_image_url ??
                                        'https://picsum.photos/418/238',
                                }}
                                style={style.img}
                            />
                        </View>
                    </View>
                </Pressable>
                <View>
                    <Text
                        style={[
                            style.titleText,
                            style.textColor,
                            focused && style.textColorFocused,
                        ]}
                        numberOfLines={2}
                    >
                        {item.movie_title}
                    </Text>
                    <Text
                        style={[
                            style.directorText,
                            style.textColor,
                            focused && style.textColorFocused,
                        ]}
                    >
                        {item.director_name}
                    </Text>
                    <Text
                        style={[
                            style.infoText,
                            style.textColor,
                            focused && style.textColorFocused,
                        ]}
                    >
                        {`${
                            item.movie_genre
                        } - ${formatDuration(item.movie_duration)}`}
                    </Text>
                </View>
            </View>
        </>
    );
};
