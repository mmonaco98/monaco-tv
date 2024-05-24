import { StyleSheet, View, Image, Text } from 'react-native';
import { useStore } from '../../stores/appStores';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '60%',
        flexDirection: 'row',
    },
    imageContainer: {
        height: '100%',
        width: '65%',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: -1,
    },
    textContainer: {
        height: '100%',
        width: '50%',
    },
    title: {
        color: AppColors.white,
        fontSize: vScale(80),
    },
    releaseYear: {},
    description: {},
});

export const MoviePreview = (): JSX.Element => {
    const focusedItem = useStore((state) => state.focusedItem);
    if (!focusedItem) return <View style={style.container} />;
    return (
        <>
            <View style={style.container}>
                <View style={style.textContainer}>
                    <Text style={style.title}>{focusedItem.movie_title}</Text>
                    <Text style={style.releaseYear}>
                        {focusedItem.movie_release_year}
                    </Text>
                    <Text style={style.description}>
                        {focusedItem.movie_description}
                    </Text>
                </View>
                <View style={style.imageContainer}>
                    <Image
                        src={focusedItem.movie_image_url}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                    />
                </View>
            </View>
        </>
    );
};
