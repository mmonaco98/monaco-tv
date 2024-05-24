import { FlatList, View, StyleSheet } from 'react-native';
import { Carousel } from '../Carousel/Carousel';
import { HomeData } from '../../helpers/fakeData';
import { AppColors } from '../../enums/colors';

const style = StyleSheet.create({
    container: {
        height: '40%',
        width: '100%',
    },
});

export const CarouselsContainer = ({ navigation }): JSX.Element => {
    return (
        <>
            <View style={style.container}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={HomeData.sections}
                    renderItem={({ item, index }) => {
                        return (
                            <Carousel
                                data={item.data}
                                type={item.type}
                                navigation={navigation}
                            />
                        );
                    }}
                ></FlatList>
            </View>
        </>
    );
};
