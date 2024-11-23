import { StyleSheet, View } from 'react-native';
import { AppColors } from '../enums/colors';
import { CarouselsContainer } from '../components/CarouselsContainer/CarouselsContainer';
import { HomePreview } from '../components/StandardPreview/StandardPreview';
import { SideMenu } from '../components/SideMenu/SideMenu';
import { hScale } from '../helpers/sizeHelper';
import { SearchContainer } from '../components/SearchContainer/SearchContainer';

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
        width: hScale(200),
        height: '100%',
        zIndex: 2,
    },
    searchContainer: {
        marginLeft: hScale(150),
    },
});

export const SearchPage = (): JSX.Element => {
    return (
        <>
            <View style={style.searchPage}>
                <View style={style.menuWrapper}>
                    <SideMenu />
                </View>
                <View style={style.searchContainer}>
                    <SearchContainer />
                </View>
            </View>
        </>
    );
};
