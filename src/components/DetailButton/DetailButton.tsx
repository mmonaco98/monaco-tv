import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';
import { useEffect, useState } from 'react';
import { ImageProps } from 'react-native';
import { DetailButtonType } from '../../enums/detail';

const style = StyleSheet.create({
    button: {
        width: hScale(100),
        height: vScale(100),
        backgroundColor: AppColors.black60,
        borderRadius: hScale(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: hScale(50),
        height: vScale(50),
        tintColor: AppColors.white,
    },
});

export interface DetailButtonProps {
    icon: string;
    text: string;
    onPress: () => void;
}

export const DetailButton = ({
    icon,
    text,
    onPress,
}: DetailButtonProps): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false);
    const [source, setSource] = useState<ImageProps>();

    useEffect(() => {
        switch (icon) {
            case DetailButtonType.Play:
                setSource(require('./../../assets/icons/play.png'));
                break;
            case DetailButtonType.Like:
                setSource(require('./../../assets/icons/like.png'));
                break;
            case DetailButtonType.Dislike:
                setSource(require('./../../assets/icons/like.png'));
                break;
            case DetailButtonType.Bookmark:
                setSource(require('./../../assets/icons/bookmark.png'));
                break;
        }
    }, [icon]);
    return (
        <>
            {focused && (
                <View
                    style={{
                        backgroundColor: AppColors.white,
                        borderRadius: hScale(10),
                        position: 'absolute',
                        top: -vScale(50),
                        width: hScale(250),
                        left: -hScale(75),
                    }}
                >
                    <Text
                        style={{
                            paddingHorizontal: hScale(2),
                            paddingVertical: vScale(10),
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            fontSize: vScale(20),
                        }}
                    >
                        {text}
                    </Text>
                </View>
            )}
            <Pressable
                onFocus={() => {
                    setFocused(true);
                }}
                onBlur={() => {
                    setFocused(false);
                }}
                onPress={onPress}
            >
                <View
                    style={[
                        style.button,
                        focused && { backgroundColor: AppColors.white },
                    ]}
                >
                    <Image
                        source={source}
                        style={[
                            style.icon,
                            focused && { tintColor: AppColors.black },
                            icon === DetailButtonType.Dislike && {
                                transform: [{ scaleY: -1 }],
                            },
                        ]}
                    />
                </View>
            </Pressable>
        </>
    );
};
