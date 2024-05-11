import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { AppColors } from '../enums/colors';
import { HomeData } from '../helpers/fakeData';
import { Carousel } from '../components/Carousel/Carousel';

const style = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: AppColors.background,
    },
});

export const HomePage = (): JSX.Element => {
    return (
        <>
            <View style={style.container}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={HomeData.sections}
                    renderItem={({ item, index }) => {
                        return <Carousel data={item.data} type={item.type} />;
                    }}
                ></FlatList>
            </View>
        </>
    );
};
