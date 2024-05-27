import { Image, StyleSheet, View, Text } from 'react-native';
import { AppColors } from '../enums/colors';
import { hScale, vScale } from '../helpers/sizeHelper';
import { Flow } from '../components/Loaders/Loaders';
import { useAppStore } from '../stores/appStores';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../enums/navigation';
import { useEffect, useState } from 'react';
import { TNavigation } from '../types/navigation';
import { getHomepageByUserId } from '../utils/rest-api';
import RNSecureStorage from 'rn-secure-storage';
import { TUser } from '../types/user';

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
    text: {
        color: AppColors.white80,
        fontSize: vScale(50),
    },
});

const logoUrl = require('../assets/images/logo.png');

export const SplashPage = (): JSX.Element => {
    const updateHomepage = useAppStore((state) => state.updateHomepage);
    const updateNavigation = useAppStore((state) => state.updateNavigation);
    const updateUser = useAppStore((state) => state.updateUserInfo);
    const [user, setUser] = useState<TUser>();

    const navigation: TNavigation = useNavigation();

    useEffect(() => {
        // recupero info su User da storage nativo
        RNSecureStorage.getItem('userInfo').then((res) => {
            updateUser(JSON.parse(res));
            setUser(JSON.parse(res));
        });
        updateNavigation(navigation);
    });

    useEffect(() => {
        if (user) {
            getHomepageByUserId(user.id)
                .then((response) => {
                    updateHomepage(response);
                    setTimeout(() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: RouteNames.HomePage }],
                        });
                    }, 1000);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [user]);

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

                {user && (
                    <View style={{ position: 'absolute', bottom: vScale(150) }}>
                        <Text style={style.text}>Bentornato {user.name}!</Text>
                    </View>
                )}
            </View>
        </>
    );
};
