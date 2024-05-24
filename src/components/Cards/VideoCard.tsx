import { StyleSheet, View, Image, Pressable } from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';
import { useState } from 'react';
import { TMovie } from '../../types/movie';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../../stores/appStores';
import { RouteNames } from '../../enums/navigation';

const style = StyleSheet.create({
    cardWrapper: {
        width: hScale(428),
        height: vScale(248),
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hScale(17),
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
        width: hScale(414),
        height: hScale(234),
        borderRadius: hScale(10),
    },
});

export const VideoCard = ({
    item,
    navigation,
}: {
    item: TMovie;
    navigation;
}): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false);
    const x = useNavigation();
    const updateFocusedItem = useStore((state) => state.updateFocusedItem);
    return (
        <>
            <Pressable
                onFocus={() => {
                    setFocused(true);
                    updateFocusedItem(item);
                }}
                onBlur={() => {
                    setFocused(false);
                }}
                onPress={() => {
                    navigation.navigate(RouteNames.PlayerPage as never);
                }}
            >
                <View style={[style.cardWrapper, focused && style.focused]}>
                    <View style={style.card}>
                        <Image
                            source={{ uri: item.movie_image_url }}
                            style={style.img}
                        ></Image>
                    </View>
                </View>
            </Pressable>
        </>
    );
};
