import {
    FlatList,
    StyleSheet,
    View,
    Text,
    TVFocusGuideView,
    Pressable,
    useTVEventHandler,
} from 'react-native';
import { CardTypes } from '../../enums/cards';
import { PosterCard } from '../Cards/PosterCard';
import { VideoCard } from '../Cards/VideoCard';
import { TMovie } from '../../types/movie';
import { AppColors } from '../../enums/colors';
import { TSection } from '../../types/section';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { useEffect, useRef, useState } from 'react';
import { PreviewPage } from '../../types/preview';

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
    page,
    menuRef,
}: {
    section: TSection;
    onSectionFocus?(): void;
    activeIndex: number;
    carouselIndex: number;
    page: PreviewPage;
    menuRef: React.RefObject<any>;
}): JSX.Element => {
    const listRef = useRef<FlatList>(null);
    const [isCarouselVisible, setIsCarouselVisible] = useState<boolean>(true);
    const [focusedIndex, setFocusedIndex] = useState<number>(0);

    // scroll manager - keeps the focused item on the left side of the screen
    const scrollTo = (index: number): void => {
        listRef.current?.scrollToIndex({
            animated: true,
            index,
            viewOffset: hScale(150),
        });
    };

    useEffect(() => {
        setIsCarouselVisible(activeIndex <= carouselIndex);
    }, [activeIndex]);

    return (
        <TVFocusGuideView style={[style.container]} trapFocusRight>
            {section.sectionTitle && (
                <Text
                    style={{
                        color: AppColors.white,
                        marginLeft: hScale(150),
                        marginBottom: vScale(15),
                        fontSize: vScale(30),
                    }}
                >
                    {isCarouselVisible && section.sectionTitle.toUpperCase()}
                </Text>
            )}

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
                                    index={index}
                                    onFocus={(): void => {
                                        setFocusedIndex(index);
                                        onSectionFocus();
                                    }}
                                    isCardVisible={isCarouselVisible}
                                    menuRef={menuRef}
                                />
                            )}
                            {section.type == CardTypes.VideoCard && (
                                <VideoCard
                                    item={item}
                                    index={index}
                                    onFocus={(): void => {
                                        onSectionFocus();
                                        if (page !== PreviewPage.FAVOURITE)
                                            scrollTo(index);
                                    }}
                                    isCardVisible={isCarouselVisible}
                                    menuRef={menuRef}
                                />
                            )}
                        </>
                    );
                }}
            />
        </TVFocusGuideView>
    );
};
