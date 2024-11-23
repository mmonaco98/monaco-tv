import { Image, StyleSheet, View, Text, Pressable } from 'react-native';
import { AppColors } from '../enums/colors';
import { hScale, vScale } from '../helpers/sizeHelper';
import { Flow } from '../components/Loaders/Loaders';
import { useAppStore } from '../stores/appStores';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../enums/navigation';
import { useEffect, useState } from 'react';
import { TNavigation } from '../types/navigation';
import { getHomepageByUserId } from '../utils/rest-api';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { TUser } from '../types/user';
import { Button } from '../components/Basics/Button';

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
    buttonContainer: {
        width: hScale(300),
        height: vScale(70),
    },
    buttonsWrapper: {
        flexDirection: 'row',
        gap: hScale(20),
    },
});

const logoUrl = require('../assets/images/logo.png');

export const SplashPage = (): JSX.Element => {
    const updateHomepage = useAppStore((state) => state.updateHomepage);
    const updateNavigation = useAppStore((state) => state.updateNavigation);
    const updateUser = useAppStore((state) => state.updateUserInfo);
    const [user, setUser] = useState<TUser>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigation: TNavigation = useNavigation();

    const retriveUser = async (): Promise<TUser | undefined> => {
        const user = await RNSecureStorage.exist('userInfo')
            .then(async (res) => {
                if (!res) return undefined;
                const locUser: TUser = await RNSecureStorage.getItem(
                    'userInfo'
                ).then((res) => {
                    return JSON.parse(res);
                });
                setUser(locUser);
                updateUser(locUser);
                return locUser;
            })
            .catch();
        return user;
    };

    const getHomepage = async (user: TUser) => {
        getHomepageByUserId(user.id)
            .then((response) => {
                updateHomepage(response.slice(0, 10));
                setTimeout(() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: RouteNames.FavouritePage }],
                    });
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const initApp = async () => {
        updateNavigation(navigation);
        retriveUser().then((user) => {
            if (user) {
                getHomepage(user);
            } else {
                setTimeout(() => {
                    setIsLoading(false);
                }, 2500);
            }
        });
    };

    const _setUser = async () => {
        await RNSecureStorage.setItem(
            'userInfo',
            JSON.stringify({
                id: 2,
                name: 'Chiara',
                mail: 'c.castignani@foo.it',
                age: 24,
                avatar: 'https://avatar.iran.liara.run/public/65',
                gender: 'F',
                password: 'abcd',
            }),
            {
                accessible: ACCESSIBLE.ALWAYS,
            }
        );
    };

    const _deleteUser = async () => {
        await RNSecureStorage.removeItem('userInfo');
    };

    useEffect(() => {
        /* _deleteUser()
            .then(() => {})
            .catch(); */
        /* _setUser().then().catch(); */
        initApp()
            .then(() => {})
            .catch(() => {});
    }, []);

    return (
        <>
            <View style={style.container}>
                <View style={{ height: vScale(300) }} />
                <Image source={logoUrl} style={style.logo} />
                <View style={{ height: vScale(300) }}>
                    {isLoading && (
                        <Flow
                            size={hScale(100)}
                            colors={['#ff5726', '#ff6c27', '#ff8325']}
                        />
                    )}
                    {!isLoading && (
                        <View style={style.buttonsWrapper}>
                            <View style={style.buttonContainer}>
                                <Button
                                    buttonText={'Accedi'}
                                    onPress={() => {
                                        navigation.navigate(
                                            RouteNames.LoginPage
                                        );
                                    }}
                                />
                            </View>
                            <View style={style.buttonContainer}>
                                <Button
                                    buttonText={'Registrati'}
                                    onPress={() => {
                                        navigation.navigate(
                                            RouteNames.SignInPage
                                        );
                                    }}
                                />
                            </View>
                        </View>
                    )}
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
