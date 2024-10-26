import { StyleSheet, View, Image, Pressable } from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';
import { useState } from 'react';
import { TMovie } from '../../types/movie';
import { useAppStore } from '../../stores/appStores';
import { RouteNames } from '../../enums/navigation';

const style = StyleSheet.create({
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
});

export const VideoCard = ({
    item,
    onFocus,
}: {
    item: TMovie;
    onFocus?(): void;
}): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false);
    const updateFocusedItem = useAppStore((state) => state.updateFocusedItem);
    const navigation = useAppStore((state) => state.navigation);

    return (
        <>
            <Pressable
                onFocus={() => {
                    onFocus();
                    setFocused(true);
                    updateFocusedItem(item);
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
        </>
    );
};
