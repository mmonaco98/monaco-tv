import { Image, StyleSheet, View, Text } from 'react-native';
import { AppColors } from '../enums/colors';
import { hScale, vScale } from '../helpers/sizeHelper';
import { Flow } from '../components/Loaders/Loaders';
import { useEffect } from 'react';
import { useStore } from '../stores/appStores';

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
