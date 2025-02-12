import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { TMovie } from '../../types/movie';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { VideoCard } from '../Cards/VideoCard';
import { SearchCard } from '../Cards/SearchCard';
import { LinearGradient } from '../Basics/LinearGradient';
import { AppColors } from '../../enums/colors';
import { TColorList } from '../../types/common';
import { Flow } from '../Loaders/Loaders';

const style = StyleSheet.create({
    searchMovieGrid: {
        paddingLeft: hScale(20),
        paddingTop: vScale(416),
        paddingBottom: vScale(1080),
        gap: vScale(20),
    },
    loaderWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
});

interface SearchMovieGridProps {
    movieList: TMovie[];
    searchText: string;
}
export const SearchMovieGrid = ({
    movieList,
    searchText,
}: SearchMovieGridProps): JSX.Element => {
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const listRef = useRef<FlatList>(null);

    useEffect(() => {
        setIsFetching(true);
        if (!!movieList) {
            scrollTo(0);
        }
    }, [searchText]);

    useEffect(() => {
        setIsFetching(false);
    }, [movieList]);

    // scroll manager - keeps the focused item on the center of the screen
    const scrollTo = (index: number): void => {
        listRef.current?.scrollToIndex({
            animated: true,
            index,
            viewOffset: hScale(416),
        });
    };

    return (
        <>
            {isFetching ? (
                <View style={style.loaderWrapper}>
                    <Flow
                        size={hScale(100)}
                        colors={['#ff5726', '#ff6c27', '#ff8325']}
                    />
                </View>
            ) : (
                <FlatList
                    ref={listRef}
                    scrollEnabled={false}
                    contentContainerStyle={style.searchMovieGrid}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={movieList}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <SearchCard
                                    item={item}
                                    key={`movie_${item.movie_id}`}
                                    onFocus={(): void => {
                                        scrollTo(index);
                                    }}
                                />
                            </>
                        );
                    }}
                />
            )}
        </>
    );
};
