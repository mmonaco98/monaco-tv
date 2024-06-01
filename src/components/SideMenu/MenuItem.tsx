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

const style = StyleSheet.create({
    container: {
        width: hScale(70),
        height: vScale(70),
        borderRadius: hScale(100),
        //backgroundColor: AppColors.orange,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: hScale(10),
        //paddingLeft: hScale(10),
    },
    icon: {
        tintColor: AppColors.white,
        width: hScale(50),
        height: vScale(50),
    },
});

export const MenuItem = ({ item }: { item: MenuVoice }): JSX.Element => {
    const [source, setSource] = useState<ImageProps>();
    const [focused, setFocused] = useState<boolean>(false);

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
    return (
        <>
            <Pressable
                onFocus={() => {
                    setFocused(true);
                }}
                onBlur={() => {
                    setFocused(false);
                }}
                hasTVPreferredFocus={item.icon === MenuItemType.Home}
            >
                <View
                    style={[
                        style.container,
                        focused && { backgroundColor: AppColors.white },
                    ]}
                >
                    <Image
                        style={[
                            style.icon,
                            focused && { tintColor: AppColors.background },
                        ]}
                        source={source}
                    />
                </View>
                {/* <View>{focused && <Text>{item.buttonText}</Text>}</View> */}
            </Pressable>
        </>
    );
};
