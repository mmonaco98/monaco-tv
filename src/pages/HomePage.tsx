import { StyleSheet, View } from 'react-native';
import { AppColors } from '../enums/colors';
import { CarouselsContainer } from '../components/CarouselsContainer/CarouselsContainer';
import { MoviePreview } from '../components/MoviePreview/MoviePreview';
import { SideMenu } from '../components/SideMenu/SideMenu';
import { hScale } from '../helpers/sizeHelper';

const style = StyleSheet.create({
    homePage: {
        height: '100%',
        width: '100%',
        backgroundColor: AppColors.background,
    },
    menuWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
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
                <MoviePreview />
                <CarouselsContainer />
            </View>
        </>
    );
};
