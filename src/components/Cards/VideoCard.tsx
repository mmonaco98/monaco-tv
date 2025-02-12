import {
    StyleSheet,
    View,
    Image,
    Pressable,
    ImageProps,
    useTVEventHandler,
} from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';
import { useEffect, useState } from 'react';
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
    index,
    onFocus,
    isCardVisible,
    menuRef,
}: {
    item: TMovie;
    index: number;
    onFocus?(): void;
    isCardVisible: boolean;
    menuRef: React.RefObject<any>;
}): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false);
    const [imageURL, setImageURL] = useState<ImageProps>();
    const [canGoToMenu, setCanGoToMenu] = useState<boolean>(false);
    const updateFocusedItem = useAppStore((state) => state.updateFocusedItem);
    const navigation = useAppStore((state) => state.navigation);

    useTVEventHandler((evt) => {
        if (index !== 0) return;
        if (evt.eventType === 'left' && canGoToMenu) {
            menuRef.current.requestTVFocus();
        }
    });

    useEffect(() => {
        setImageURL(
            item.movie_image_url
                ? { uri: item.movie_image_url }
                : require('./../../assets/images/placeholder.png')
        );
    }, []);
    return (
        <Pressable
            onFocus={() => {
                onFocus();
                setFocused(true);
                updateFocusedItem(item);
                setTimeout(() => {
                    setCanGoToMenu(true);
                }, 200);
            }}
            onBlur={() => {
                setFocused(false);
                setCanGoToMenu(false);
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
                {isCardVisible && (
                    <View style={style.card}>
                        <Image source={imageURL} style={style.img} />
                    </View>
                )}
            </View>
        </Pressable>
    );
};
