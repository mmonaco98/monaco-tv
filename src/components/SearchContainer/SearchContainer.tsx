import { View, StyleSheet, Image, Text } from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';
import { VirtualKeyboard } from '../VirtualKeyboard/VirtualKeyboard';
import { useEffect, useState } from 'react';
import { searchMoviebyTitle } from '../../utils/rest-api';
import { TMovie } from '../../types/movie';
import { SearchMovieGrid } from '../SearchMovieGrid/SearchMovieGrid';

const style = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
    },
    searchWrapper: {
        width: '42%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: vScale(50),
    },
    searchTextWrapper: {
        flexDirection: 'row',
        gap: hScale(20),
        borderColor: AppColors.white80,
        borderBottomWidth: vScale(2),
    },
    searchTextInput: {
        width: hScale(400),
        height: vScale(50),
        justifyContent: 'center',
    },
    text: {
        fontSize: vScale(35),
        color: AppColors.white,
    },
    icon: {
        width: hScale(50),
        height: vScale(50),
        tintColor: AppColors.white,
    },
    movieListWrapper: {
        width: '58%',
        backgroundColor: AppColors.white20,
    },
});

export const SearchContainer = (): JSX.Element => {
    const [searchText, setSearchText] = useState<string>();
    const [movieList, setMovieList] = useState<TMovie[]>();

    const onPressKeyboardButton = (char: string): void => {
        switch (char) {
            case 'backspace':
                setSearchText(searchText.substring(0, searchText.length - 1));
                break;
            case 'space':
                setSearchText(searchText + ' ');
                break;
            default:
                setSearchText(searchText + char);
        }
    };

    useEffect(() => {
        setSearchText('');
    }, []);

    useEffect(() => {
        searchMoviebyTitle(searchText)
            .then((resp) => {
                setMovieList(resp);
            })
            .catch((err) => console.log(err));
    }, [searchText]);

    return (
        <View style={style.searchContainer}>
            <View style={style.searchWrapper}>
                <View style={style.searchTextWrapper}>
                    <Image
                        source={require('./../../assets/icons/search.png')}
                        style={style.icon}
                    />
                    <View style={style.searchTextInput}>
                        <Text style={style.text}>{searchText}</Text>
                    </View>
                </View>
                <VirtualKeyboard onPress={onPressKeyboardButton} />
            </View>
            <View style={style.movieListWrapper}>
                <SearchMovieGrid
                    movieList={movieList}
                    searchText={searchText}
                />
            </View>
        </View>
    );
};
