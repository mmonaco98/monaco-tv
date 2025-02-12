import { StyleSheet, View } from 'react-native';
import { AppColors } from '../enums/colors';
import { CarouselsContainer } from '../components/CarouselsContainer/CarouselsContainer';
import { StandardPreview } from '../components/StandardPreview/StandardPreview';
import { SideMenu } from '../components/SideMenu/SideMenu';
import { hScale } from '../helpers/sizeHelper';
import { PreviewPage } from '../types/preview';
import React, { useRef } from 'react';

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
    const menuRef = useRef(null);

    return (
        <>
            <View style={style.homePage}>
                <View style={style.menuWrapper}>
                    <SideMenu menuRef={menuRef} />
                </View>
                <StandardPreview />
                <CarouselsContainer
                    page={PreviewPage.HOMEPAGE}
                    menuRef={menuRef}
                />
            </View>
        </>
    );
};
