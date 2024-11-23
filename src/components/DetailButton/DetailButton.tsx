import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';
import { useEffect, useState } from 'react';
import { ImageProps } from 'react-native';
import { DetailButtonType } from '../../enums/detail';
import { TMovieUserPref } from '../../types/movie';

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
    movieUserPref?: TMovieUserPref;
}

export const DetailButton = ({
    icon,
    text,
    onPress,
    movieUserPref,
}: DetailButtonProps): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false);
    const [source, setSource] = useState<ImageProps>();
    const [labelWidth, setLabelWidth] = useState<number>(1);

    useEffect(() => {
        switch (icon) {
            case DetailButtonType.Play:
                setSource(require('./../../assets/icons/play.png'));
                break;
            case DetailButtonType.Like:
                if (movieUserPref.isLiked) {
                    setSource(require('./../../assets/icons/like_active.png'));
                    break;
                }
                setSource(require('./../../assets/icons/like.png'));
                break;
            case DetailButtonType.Dislike:
                if (movieUserPref.isDisliked) {
                    setSource(require('./../../assets/icons/like_active.png'));
                    break;
                }
                setSource(require('./../../assets/icons/like.png'));
                break;
            case DetailButtonType.Bookmark:
                if (movieUserPref.isFavourite) {
                    setSource(
                        require('./../../assets/icons/bookmark_active.png')
                    );
                    break;
                }
                setSource(require('./../../assets/icons/bookmark.png'));
                break;
        }
        setLabelWidth((250 * (text.length + 9)) / 30);
    }, [icon, movieUserPref]);
    return (
        <>
            {focused && (
                <View
                    style={{
                        backgroundColor: AppColors.white,
                        borderRadius: hScale(10),
                        position: 'absolute',
                        top: -vScale(50),
                        width: hScale(labelWidth),
                        left: -hScale((labelWidth - 100) / 2),
                    }}
                >
                    <Text
                        style={{
                            paddingHorizontal: hScale(5),
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
