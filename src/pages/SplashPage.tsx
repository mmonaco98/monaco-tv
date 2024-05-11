import { Image, StyleSheet, View, Text } from 'react-native';
import { AppColors } from '../enums/colors';
import { hScale, vScale } from '../helpers/sizeHelper';
import { Flow } from '../components/Loaders/Loaders';
import { useEffect } from 'react';
import { useStore } from '../stores/appStores';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../enums/navigation';

const style = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: AppColors.background,
    },
    logo: {
        width: hScale(300),
        height: vScale(300),
    },
});

const logoUrl = require('../assets/images/logo.png');

export const SplashPage = (): JSX.Element => {
    const userName = useStore((state) => state.userInfo);
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: RouteNames.HomePage }],
            });
        }, 2000);
    }, []);

    return (
        <>
            <View style={style.container}>
                <View style={{ height: vScale(300) }} />
                <Image source={logoUrl} style={style.logo} />
                <View style={{ height: vScale(300) }}>
                    <Flow
                        size={hScale(100)}
                        colors={['#ff5726', '#ff6c27', '#ff8325']}
                    />
                </View>
                <Text>Ciao {userName}!</Text>
            </View>
        </>
    );
};
