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
    gradient: {
        position: 'absolute',
        right: 0,
        width: '100%',
        height: vScale(100),
        zIndex: 5,
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
        scrollTo(0);
    }, [searchText]);

    useEffect(() => {
        setIsFetching(false);
    }, [movieList]);

    // scroll manager - keeps the focused item on the left side of the screen
    const scrollTo = (index: number): void => {
        listRef.current?.scrollToIndex({
            animated: true,
            index,
            viewOffset: hScale(416),
        });
    };

    const gradientColors: TColorList[] = [
        { opacity: '1', color: AppColors.background, offset: '80%' },
        { opacity: '0', color: AppColors.background, offset: '0%' },
    ];

    return (
        <>
            <View style={[style.gradient, { top: 0 }]}>
                <LinearGradient
                    x1={'100%'}
                    x2={'100%'}
                    y1={'100%'}
                    y2={'0%'}
                    colorList={gradientColors}
                />
            </View>
            <View style={[style.gradient, { bottom: 0 }]}>
                <LinearGradient
                    x1={'100%'}
                    x2={'100%'}
                    y1={'0%'}
                    y2={'100%'}
                    colorList={gradientColors}
                />
            </View>
            {isFetching ? (
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                    }}
                >
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
