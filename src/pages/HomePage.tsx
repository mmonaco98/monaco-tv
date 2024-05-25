import { StyleSheet, View } from 'react-native';
import { AppColors } from '../enums/colors';
import { CarouselsContainer } from '../components/CarouselsContainer/CarouselsContainer';
import { MoviePreview } from '../components/MoviePreview/MoviePreview';

const style = StyleSheet.create({
    homePage: {
        height: '100%',
        width: '100%',
        backgroundColor: AppColors.background,
    },
});

export const HomePage = (): JSX.Element => {
    return (
        <>
            <View style={style.homePage}>
                <MoviePreview />
                <CarouselsContainer />
            </View>
        </>
    );
};
