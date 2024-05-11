import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { AppColors } from '../enums/colors';
import { PosterCard } from '../components/Cards/PosterCard';
import { VideoCard } from '../components/Cards/VideoCard';

const style = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: AppColors.background,
        gap: 50,
    },
});

const data = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
];

export const HomePage = (): JSX.Element => {
    return (
        <>
            <View style={style.container}>
                <FlatList
                    horizontal
                    data={data}
                    renderItem={() => {
                        return <PosterCard />;
                    }}
                ></FlatList>
            </View>
        </>
    );
};
