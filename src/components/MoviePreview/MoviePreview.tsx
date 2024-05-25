import { StyleSheet, View, Image, Text } from 'react-native';
import { useAppStore } from '../../stores/appStores';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';
import { RadialGradient } from '../Basics/RadialGradient';
import { Label } from '../Label/Label';

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
        paddingLeft: hScale(180),
        paddingTop: vScale(50),
    },
    title: {
        color: AppColors.white,
        fontSize: vScale(80),
    },
    releaseYear: {},
    description: {},
});

const colorList = [
    { offset: '10%', color: AppColors.background, opacity: '0.4' },
    { offset: '50%', color: AppColors.background, opacity: '0' },
    { offset: '100%', color: AppColors.background, opacity: '1' },
];

export const MoviePreview = (): JSX.Element => {
    const focusedItem = useAppStore((state) => state.focusedItem);

    if (!focusedItem) return <View style={style.container} />;

    return (
        <>
            <View style={style.container}>
                <View style={style.textContainer}>
                    <Text style={style.title}>{focusedItem.movie_title}</Text>

                    <Label
                        size={{ width: hScale(60), height: vScale(25) }}
                        bgColor={AppColors.orange}
                        labelText={focusedItem.movie_release_year.toString()}
                        textStyle={{
                            color: AppColors.white,
                            fontSize: vScale(16),
                        }}
                    />
                    <Text style={style.description}>
                        {focusedItem.movie_description}
                    </Text>
                </View>
                <View style={style.imageContainer}>
                    <Image
                        src={focusedItem.movie_image_url}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                        }}
                        resizeMode="cover"
                    />
                    <RadialGradient
                        cx="100%"
                        cy="0%"
                        rx="100%"
                        ry="100%"
                        colorList={colorList}
                    />
                </View>
            </View>
        </>
    );
};
