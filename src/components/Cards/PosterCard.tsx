import { StyleSheet, View, Image, Pressable } from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';
import { TMovie } from '../../types/movie';
import { useState } from 'react';
import { useAppStore } from '../../stores/appStores';

const style = StyleSheet.create({
    cardWrapper: {
        width: hScale(240),
        height: vScale(354),
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
        width: hScale(226),
        height: hScale(340),
        borderRadius: hScale(10),
    },
});

export const PosterCard = ({ item }: { item: TMovie }): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false);
    const updateFocusedItem = useAppStore((state) => state.updateFocusedItem);

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
            >
                <View style={[style.cardWrapper, focused && style.focused]}>
                    <View style={style.card}>
                        <Image
                            source={{ uri: item.movie_image_url }}
                            style={style.img}
                        />
                    </View>
                </View>
            </Pressable>
        </>
    );
};
