import { View, StyleSheet, Image, Text } from 'react-native';
import { AppColors } from '../../enums/colors';
import { hScale, vScale } from '../../helpers/sizeHelper';

const style = StyleSheet.create({
    container: {
        width: hScale(196),
        height: vScale(196),
        borderColor: 'transparent',
        borderWidth: hScale(3),
        borderRadius: hScale(150),
        justifyContent: 'center',
        alignItems: 'center',
        gap: vScale(20),
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
    text: {
        fontSize: vScale(35),
        color: AppColors.white,
    },
});

interface AvatarProps {
    focused: boolean;
    source: string;
    selected: boolean;
    name?: string;
}

export const Avatar = (props: AvatarProps): JSX.Element => {
    return (
        <>
            <View style={[style.container, props.focused && style.focused]}>
                <Image
                    source={{ uri: props.source }}
                    style={[style.image, props.selected && style.selected]}
                />
                {!!props.name && <Text style={style.text}>{props.name}</Text>}
            </View>
        </>
    );
};
