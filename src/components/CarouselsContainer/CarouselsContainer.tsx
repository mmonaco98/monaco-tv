import { FlatList, View, StyleSheet } from 'react-native';
import { Carousel } from '../Carousel/Carousel';
import { HomeData } from '../../helpers/FakeData';
import { useAppStore } from '../../stores/appStores';
import { useRef, useState } from 'react';
import { hScale, vScale } from '../../helpers/sizeHelper';

const style = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
});

export const CarouselsContainer = (): JSX.Element => {
    const homepage = useAppStore((state) => state.homepage);
    const listRef = useRef<FlatList>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    // scroll manager - keeps the focused item on the left side of the screen
    const scrollTo = (index: number): void => {
        listRef.current?.scrollToIndex({
            animated: true,
            index,
            viewOffset: vScale(648),
        });
        setActiveIndex(index);
    };

    return (
        <>
            <View style={style.container}>
                <FlatList
                    ref={listRef}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: vScale(648),
                        paddingBottom: vScale(1080),
                    }}
                    data={homepage}
                    renderItem={({ item, index }) => {
                        return (
                            <Carousel
                                section={item}
                                onSectionFocus={(): void => {
                                    scrollTo(index);
                                }}
                                carouselIndex={index}
                                activeIndex={activeIndex}
                            />
                        );
                    }}
                ></FlatList>
            </View>
        </>
    );
};
