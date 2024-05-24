import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { AppColors } from '../enums/colors';
import { HomeData } from '../helpers/fakeData';
import { Carousel } from '../components/Carousel/Carousel';
import { API_URL } from '../../ENV';
import { useEffect, useState } from 'react';
import { TMovie } from '../types/movie';
import { useStore } from '../stores/appStores';
import { CarouselsContainer } from '../components/CarouselsContainer/CarouselsContainer';
import { MoviePreview } from '../components/MoviePreview/MoviePreview';

const style = StyleSheet.create({
    homePage: {
        height: '100%',
        width: '100%',
        backgroundColor: AppColors.background,
    },
});

export const HomePage = ({ navigation }): JSX.Element => {
    return (
        <>
            <View style={style.homePage}>
                <MoviePreview />
                <CarouselsContainer navigation={navigation} />
            </View>
        </>
    );
};
