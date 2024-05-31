import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';
import { Avatar } from './Avatar';

const style = StyleSheet.create({
    container: {
        width: hScale(196),
        height: vScale(196),
        borderColor: 'transparent',
        borderWidth: hScale(3),
        borderRadius: hScale(150),
        justifyContent: 'center',
        alignItems: 'center',
    },
    focused: {
        borderColor: AppColors.white,
    },
    image: {
        width: hScale(190),
        height: vScale(190),
        opacity: 0.5,
    },
    selected: {
        opacity: 1,
    },
});

export const AvatarButton = ({
    source,
    selSource,
    onPress,
}: {
    source: string;
    selSource;
    onPress: (av: string) => void;
}): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false);
    const [selected, setSelected] = useState<boolean>(false);

    useEffect(() => {
        setSelected(source === selSource);
    }, [selSource]);
    return (
        <>
            <Pressable
                onFocus={() => {
                    setFocused(true);
                }}
                onBlur={() => {
                    setFocused(false);
                }}
                onPress={() => {
                    onPress(source);
                }}
            >
                <Avatar focused={focused} source={source} selected={selected} />
            </Pressable>
        </>
    );
};
