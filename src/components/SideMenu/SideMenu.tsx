import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { LinearGradient } from '../Basics/LinearGradient';
import { TColorList } from '../../types/common';
import { AppColors } from '../../enums/colors';
import { MenuItem } from './MenuItem';
import { RouteNames } from '../../enums/navigation';
import { MenuVoice } from '../../types/menu';
import { MenuItemType } from '../../enums/menu';
import { useRef } from 'react';
import { useAppStore } from '../../stores/appStores';

const style = StyleSheet.create({
    sideMenu: {
        width: hScale(150),
        height: '100%',
    },
    menuContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    topBottomContainer: {
        height: vScale(150),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        height: vScale(700),
        width: '100%',
    },
});

const menu: MenuVoice[] = [
    {
        buttonText: 'Cerca',
        route: RouteNames.SearchPage,
        icon: MenuItemType.Search,
    },
    {
        buttonText: 'Homepage',
        route: RouteNames.HomePage,
        icon: MenuItemType.Home,
    },
    {
        buttonText: 'Preferiti',
        route: RouteNames.ListingPage,
        icon: MenuItemType.Bookmarks,
    },

    {
        buttonText: 'Impostazioni',
        route: RouteNames.SettingsPage,
        icon: MenuItemType.Settings,
    },
];

export const SideMenu = (): JSX.Element => {
    const addNextFocusRef = useAppStore((state) => state.addNextFocus);
    const menuRef = useRef();
    addNextFocusRef({ name: 'MENU', ref: menuRef });

    const gradientColors: TColorList[] = [
        { opacity: '1', color: AppColors.background, offset: '30%' },
        { opacity: '.8', color: AppColors.background, offset: '10%' },
        { opacity: '.4', color: AppColors.background, offset: '4%' },
        { opacity: '0', color: AppColors.background, offset: '2%' },
    ];
    return (
        <>
            <View style={style.sideMenu} ref={menuRef}>
                <LinearGradient
                    x1={'100%'}
                    x2={'0%'}
                    y1={'100%'}
                    y2={'100%'}
                    colorList={gradientColors}
                >
                    <View style={style.menuContainer}>
                        <View style={style.topBottomContainer}></View>
                        <View style={style.listContainer}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{
                                    height: '100%',
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: vScale(50),
                                }}
                                data={menu}
                                renderItem={({ item, index }) => {
                                    return <MenuItem item={item} />;
                                }}
                            />
                        </View>
                        <View style={style.topBottomContainer}>
                            <Image
                                style={{
                                    width: hScale(70),
                                    height: vScale(70),
                                }}
                                source={require('./../../assets/images/logo.png')}
                            />
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </>
    );
};
