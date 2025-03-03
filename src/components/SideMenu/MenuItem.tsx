import {
    Image,
    ImageProps,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';
import { MenuVoice } from '../../types/menu';
import { useEffect, useState } from 'react';
import { MenuItemType } from '../../enums/menu';
import { useAppStore } from '../../stores/appStores';
import { RouteNames } from '../../enums/navigation';
import { ACCESSIBLE, default as localStorage } from 'rn-secure-storage';

const style = StyleSheet.create({
    container: {
        width: hScale(70),
        height: vScale(70),
        borderRadius: hScale(100),
        //backgroundColor: AppColors.orange,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: hScale(10),
        paddingLeft: hScale(10),
    },
    icon: {
        tintColor: AppColors.white,
        width: hScale(50),
        height: vScale(50),
    },
    text: {
        color: AppColors.white,
        fontSize: vScale(25),
    },
});

export const MenuItem = ({
    item,
    onFocus,
    isMenuOpen,
}: {
    item: MenuVoice;
    onFocus: () => void;
    isMenuOpen: boolean;
}): JSX.Element => {
    const [source, setSource] = useState<ImageProps>();
    const [focused, setFocused] = useState<boolean>(false);
    const navigation = useAppStore((state) => state.navigation);

    useEffect(() => {
        switch (item.icon) {
            case MenuItemType.Home:
                setSource(require('./../../assets/icons/home.png'));
                break;
            case MenuItemType.Settings:
                setSource(require('./../../assets/icons/settings.png'));
                break;
            case MenuItemType.Search:
                setSource(require('./../../assets/icons/search.png'));
                break;
            case MenuItemType.Bookmarks:
                setSource(require('./../../assets/icons/bookmark.png'));
                break;
        }
    });

    const handleOnPressMenuItem = () => {
        if (item.route === RouteNames.SplashPage) {
            localStorage.removeItem('userInfo');
            navigation.reset({
                index: 0,
                routes: [{ name: RouteNames.SplashPage }],
            });
        } else if (item.route === RouteNames.HomePage) {
            navigation.reset({
                index: 0,
                routes: [{ name: RouteNames.HomePage }],
            });
        } else navigation.navigate(item.route);
    };
    return (
        <Pressable
            onFocus={() => {
                onFocus();
                setFocused(true);
            }}
            onBlur={() => {
                setFocused(false);
            }}
            onPress={() => {
                handleOnPressMenuItem();
            }}
        >
            <View
                style={[
                    style.container,
                    focused && { backgroundColor: AppColors.white },
                    isMenuOpen && { width: hScale(230) },
                ]}
            >
                <Image
                    style={[
                        style.icon,
                        focused && { tintColor: AppColors.background },
                    ]}
                    source={source}
                />
                {isMenuOpen && (
                    <Text
                        style={[
                            style.text,
                            focused && { color: AppColors.background },
                        ]}
                    >
                        {item.buttonText}
                    </Text>
                )}
            </View>
        </Pressable>
    );
};
