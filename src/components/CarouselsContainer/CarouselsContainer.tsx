import { FlatList, View, StyleSheet } from 'react-native';
import { Carousel } from '../Carousel/Carousel';
import { HomeData } from '../../helpers/FakeData';
import { useAppStore } from '../../stores/appStores';

const style = StyleSheet.create({
    container: {
        height: '40%',
        width: '100%',
    },
});

export const CarouselsContainer = (): JSX.Element => {
    const homepage = useAppStore((state) => state.homepage);
    return (
        <>
            <View style={style.container}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={homepage}
                    renderItem={({ item, index }) => {
                        return <Carousel section={item} />;
                    }}
                ></FlatList>
            </View>
        </>
    );
};
