import { FlatList, StyleSheet, View } from 'react-native';
import { CardTypes } from '../../enums/cards';
import { PosterCard } from '../Cards/PosterCard';
import { VideoCard } from '../Cards/VideoCard';

const style = StyleSheet.create({
    container: {},
});

export const Carousel = ({ data, type }): JSX.Element => {
    return (
        <>
            <View style={style.container}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                {type == CardTypes.PosterCard && (
                                    <PosterCard item={item} />
                                )}
                                {type == CardTypes.VideoCard && (
                                    <VideoCard item={item} />
                                )}
                            </>
                        );
                    }}
                />
            </View>
        </>
    );
};
