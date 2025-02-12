import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Image,
    Pressable,
    useTVEventHandler,
} from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { LinearGradient } from '../Basics/LinearGradient';
import { TColorList } from '../../types/common';
import { AppColors } from '../../enums/colors';
import { MenuItem } from './MenuItem';
import { RouteNames } from '../../enums/navigation';
import { MenuVoice } from '../../types/menu';
import { MenuItemType } from '../../enums/menu';
import React, { useEffect, useState } from 'react';

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
        zIndex: 2,
    },
    topBottomContainer: {
        height: vScale(150),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: hScale(40),
    },
    listContainer: {
        height: vScale(700),
        width: '100%',
    },
    gradient: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        flexDirection: 'row',
        top: 0,
        left: 0,
        zIndex: 1,
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
        route: RouteNames.FavouritePage,
        icon: MenuItemType.Bookmarks,
    },

    {
        buttonText: 'Impostazioni',
        route: RouteNames.SettingsPage,
        icon: MenuItemType.Settings,
    },
];

const gradientColors: TColorList[] = [
    { opacity: '1', color: AppColors.background, offset: '30%' },
    { opacity: '.8', color: AppColors.background, offset: '10%' },
    { opacity: '.4', color: AppColors.background, offset: '4%' },
    { opacity: '0', color: AppColors.background, offset: '2%' },
];
export const SideMenu = ({
    menuRef,
    exitRef,
}: {
    menuRef: React.RefObject<any>;
    exitRef: React.RefObject<any>;
}): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const onFocusMenuItem = () => {
        setIsMenuOpen(true);
    };
    useTVEventHandler((evt) => {
        if (evt.eventType === 'right' && isMenuOpen) {
            setIsMenuOpen(false);
            exitRef.current.requestTVFocus();
        }
    });
    return (
        <View
            style={[
                style.sideMenu,
                isMenuOpen && {
                    width: hScale(300),
                },
            ]}
        >
            <View style={style.gradient}>
                {isMenuOpen && (
                    <View style={{ width: hScale(150), height: '100%' }} />
                )}
                <LinearGradient
                    x1={'100%'}
                    x2={'0%'}
                    y1={'100%'}
                    y2={'100%'}
                    style={{ width: hScale(150), height: '100%' }}
                    colorList={gradientColors}
                />
            </View>

            <View
                style={[
                    style.menuContainer,
                    isMenuOpen && { width: hScale(300) },
                ]}
                ref={menuRef}
            >
                <View style={style.topBottomContainer}></View>
                <View style={style.listContainer}>
                    <FlatList
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={menu}
                        contentContainerStyle={{
                            gap: 50,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            height: '100%',
                            paddingHorizontal: hScale(40),
                        }}
                        renderItem={({ item }) => {
                            return (
                                <MenuItem
                                    item={item}
                                    onFocus={onFocusMenuItem}
                                    isMenuOpen={isMenuOpen}
                                />
                            );
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
        </View>
    );
};
