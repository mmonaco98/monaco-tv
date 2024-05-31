import {
    FlatList,
    StyleSheet,
    View,
    Text,
    TVFocusGuideView,
} from 'react-native';
import { CardTypes } from '../../enums/cards';
import { PosterCard } from '../Cards/PosterCard';
import { VideoCard } from '../Cards/VideoCard';
import { TMovie } from '../../types/movie';
import { AppColors } from '../../enums/colors';
import { TSection } from '../../types/section';

const style = StyleSheet.create({
    container: {},
});

export const Carousel = ({ section }: { section: TSection }): JSX.Element => {
    return (
        <>
            <TVFocusGuideView
                style={style.container}
                trapFocusLeft
                trapFocusRight
            >
                <Text style={{ color: AppColors.white }}>
                    {section.sectionTitle}
                </Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={section.movies}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                {section.type == CardTypes.PosterCard && (
                                    <PosterCard item={item} />
                                )}
                                {section.type == CardTypes.VideoCard && (
                                    <VideoCard item={item} />
                                )}
                            </>
                        );
                    }}
                />
            </TVFocusGuideView>
        </>
    );
};
