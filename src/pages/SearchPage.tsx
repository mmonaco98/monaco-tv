import { StyleSheet, View } from 'react-native';
import { AppColors } from '../enums/colors';
import { SideMenu } from '../components/SideMenu/SideMenu';
import { hScale } from '../helpers/sizeHelper';
import { SearchContainer } from '../components/SearchContainer/SearchContainer';
import { useRef } from 'react';

const style = StyleSheet.create({
    searchPage: {
        height: '100%',
        width: '100%',
        backgroundColor: AppColors.background,
    },
    menuWrapper: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        //width: hScale(200),
        height: '100%',
        zIndex: 2,
    },
    searchContainer: {
        marginLeft: hScale(150),
    },
});

export const SearchPage = (): JSX.Element => {
    const menuRef = useRef(null);
    const carouselRef = useRef(null);
    return (
        <>
            <View style={style.searchPage}>
                <View style={style.menuWrapper}>
                    <SideMenu menuRef={menuRef} exitRef={carouselRef} />
                </View>
                <View style={style.searchContainer} ref={carouselRef}>
                    <SearchContainer />
                </View>
            </View>
        </>
    );
};
