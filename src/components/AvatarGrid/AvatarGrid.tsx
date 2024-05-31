import { StyleSheet, View } from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';
import { AVATARS } from '../../helpers/avatar';
import { AvatarButton } from './AvatarButton';

const style = StyleSheet.create({
    container: {
        width: hScale(800),
        height: vScale(800),
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: vScale(5),
        columnGap: hScale(5),
    },
});

export const AvatarGrid = ({
    avatar,
    onPress,
}: {
    avatar: string;
    onPress: (av: string) => void;
}): JSX.Element => {
    return (
        <>
            <View style={style.container}>
                {AVATARS.map((avatarSrc, index) => {
                    return (
                        <View key={'avatar_' + index}>
                            <AvatarButton
                                source={avatarSrc}
                                selSource={avatar}
                                onPress={onPress}
                            />
                        </View>
                    );
                })}
            </View>
        </>
    );
};
