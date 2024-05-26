import { StyleSheet, View, Image, Text, ImageProps } from 'react-native';
import { useAppStore } from '../../stores/appStores';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';
import { RadialGradient } from '../Basics/RadialGradient';
import { Label } from '../Label/Label';
import { useEffect, useState } from 'react';

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
        paddingTop: vScale(70),
        gap: vScale(20),
    },
    title: {
        color: AppColors.white,
        fontSize: vScale(70),
    },
    releaseYear: {},
    description: {
        color: AppColors.white60,
        fontSize: vScale(25),
    },
});

const colorList = [
    { offset: '10%', color: AppColors.background, opacity: '0.4' },
    { offset: '50%', color: AppColors.background, opacity: '0' },
    { offset: '100%', color: AppColors.background, opacity: '1' },
];

export const MoviePreview = (): JSX.Element => {
    const focusedItem = useAppStore((state) => state.focusedItem);
    const [imageURL, setImageURL] = useState<ImageProps>();

    useEffect(() => {
        if (focusedItem) {
            setImageURL(
                focusedItem.movie_image_url
                    ? { uri: focusedItem.movie_image_url }
                    : require('./../../assets/images/placeholder.png')
            );
        }
    }, [focusedItem]);

    if (!focusedItem) return <View style={style.container} />;

    return (
        <>
            <View style={style.container}>
                <View style={style.textContainer}>
                    <Text style={style.title} numberOfLines={1}>
                        {focusedItem.movie_title}
                    </Text>

                    <Label
                        size={{ width: hScale(60), height: vScale(25) }}
                        bgColor={AppColors.orange80}
                        labelText={focusedItem.movie_release_year.toString()}
                        textStyle={{
                            color: AppColors.white,
                            fontSize: vScale(16),
                        }}
                    />
                    <Text style={style.description} numberOfLines={4}>
                        {focusedItem.movie_description}
                    </Text>
                </View>
                <View style={style.imageContainer}>
                    <Image
                        source={imageURL}
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
