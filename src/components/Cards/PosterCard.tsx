import { StyleSheet, View, Image, Pressable } from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';
import { useState } from 'react';

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

export const PosterCard = (): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false);
    return (
        <>
            <Pressable
                onFocus={() => {
                    setFocused(true);
                }}
                onBlur={() => {
                    setFocused(false);
                }}
            >
                <View style={[style.cardWrapper, focused && style.focused]}>
                    <View style={style.card}>
                        <Image
                            source={{ uri: 'https://picsum.photos/236/300' }}
                            style={style.img}
                        ></Image>
                    </View>
                </View>
            </Pressable>
        </>
    );
};
