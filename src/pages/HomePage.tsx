import { Pressable, StyleSheet, View, Text } from 'react-native';
import { AppColors } from '../enums/colors';
import { CarouselsContainer } from '../components/CarouselsContainer/CarouselsContainer';
import { HomePreview } from '../components/HomePreview/HomePreview';
import { SideMenu } from '../components/SideMenu/SideMenu';
import { hScale } from '../helpers/sizeHelper';
import { useEffect, useState } from 'react';
import { Flow } from '../components/Loaders/Loaders';
import { useAppStore } from '../stores/appStores';
import { getHomepageByUserId } from '../utils/rest-api';

const style = StyleSheet.create({
    homePage: {
        height: '100%',
        width: '100%',
        backgroundColor: AppColors.background,
    },
    menuWrapper: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: hScale(200),
        height: '100%',
        zIndex: 2,
    },
});

export const HomePage = (): JSX.Element => {
    return (
        <>
            <View style={style.homePage}>
                <View style={style.menuWrapper}>
                    <SideMenu />
                </View>
                <HomePreview />
                <CarouselsContainer />
            </View>
        </>
    );
};
