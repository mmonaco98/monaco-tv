import {
    FlatList,
    StyleSheet,
    View,
    Text,
    TVFocusGuideView,
    Pressable,
} from 'react-native';
import { CardTypes } from '../../enums/cards';
import { PosterCard } from '../Cards/PosterCard';
import { VideoCard } from '../Cards/VideoCard';
import { TMovie } from '../../types/movie';
import { AppColors } from '../../enums/colors';
import { TSection } from '../../types/section';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { useRef, useState } from 'react';

const style = StyleSheet.create({
    container: {
        marginBottom: vScale(30),
    },
});

export const Carousel = ({
    section,
    onSectionFocus,
    activeIndex,
    carouselIndex,
}: {
    section: TSection;
    onSectionFocus?(): void;
    activeIndex: number;
    carouselIndex: number;
}): JSX.Element => {
    const listRef = useRef<FlatList>(null);
    const [isCarouselVisible, setIsCarouselVisible] = useState<boolean>(true);

    // scroll manager - keeps the focused item on the left side of the screen
    const scrollTo = (index: number): void => {
        listRef.current?.scrollToIndex({
            animated: true,
            index,
            viewOffset: hScale(150),
        });
    };

    return (
        <>
            <TVFocusGuideView style={[style.container]} trapFocusRight>
                <Text
                    style={{
                        color: AppColors.white,
                        marginLeft: hScale(150),
                        marginBottom: vScale(15),
                        fontSize: vScale(30),
                    }}
                >
                    {section.sectionTitle.toUpperCase()}
                </Text>
                <FlatList
                    ref={listRef}
                    horizontal
                    scrollEnabled={false}
                    contentContainerStyle={{
                        paddingLeft: hScale(150),
                        paddingRight: hScale(1920),
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={section.movies}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                {section.type == CardTypes.PosterCard && (
                                    <PosterCard
                                        item={item}
                                        onFocus={(): void => {
                                            onSectionFocus();
                                            scrollTo(index);
                                        }}
                                    />
                                )}
                                {section.type == CardTypes.VideoCard && (
                                    <VideoCard
                                        item={item}
                                        onFocus={(): void => {
                                            onSectionFocus();
                                            scrollTo(index);
                                        }}
                                    />
                                )}
                            </>
                        );
                    }}
                />
            </TVFocusGuideView>
        </>
    );
};
