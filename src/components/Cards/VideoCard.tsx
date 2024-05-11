import { StyleSheet, View, Image, Pressable } from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';
import { useState } from 'react';

const style = StyleSheet.create({
    cardWrapper: {
        width: hScale(428),
        height: vScale(248),
        backgroundColor: 'unset',
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

export const VideoCard = (): JSX.Element => {
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
                            source={{ uri: 'https://picsum.photos/414/234' }}
                            style={style.img}
                        ></Image>
                    </View>
                </View>
            </Pressable>
        </>
    );
};
