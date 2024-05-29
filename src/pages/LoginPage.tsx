import { StyleSheet, Text, View } from 'react-native';
import { AppColors } from '../enums/colors';
import { VirtualKeyboard } from '../components/VirtualKeyboard/VirtualKeyboard';
import { Button } from '../components/Basics/Button';
import { hScale, vScale } from '../helpers/sizeHelper';
import { useState } from 'react';
import { useAppStore } from '../stores/appStores';
import { RouteNames } from '../enums/navigation';
import { ACCESSIBLE, default as localStorage } from 'rn-secure-storage';
import { loginUser } from '../utils/rest-api';

const style = StyleSheet.create({
    loginPage: {
        width: '100%',
        height: '100%',
        backgroundColor: AppColors.background,
        flexDirection: 'row',
    },
    firstSection: {
        width: '50%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: vScale(50),
        paddingHorizontal: hScale(150),
        paddingVertical: vScale(150),
    },
    secondSection: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.white20,
        gap: vScale(50),
    },
    button: {
        width: hScale(335),
        height: vScale(60),
    },
    ctasContainer: {
        flexDirection: 'row',
        gap: hScale(20),
    },
    text: {
        color: AppColors.white,
        fontSize: vScale(40),
    },
    textPlaceholder: {
        color: AppColors.white40,
    },
    inputContainer: {
        width: hScale(500),
        borderColor: 'transparent',
        borderBottomWidth: vScale(2),
        height: vScale(80),
        justifyContent: 'flex-end',
        paddingBottom: vScale(10),
    },
    textInputName: {
        color: AppColors.white40,
        paddingBottom: vScale(10),
        fontSize: vScale(20),
    },
    title: {
        color: AppColors.white,
        fontSize: vScale(60),
    },
    description: {
        color: AppColors.white80,
        fontSize: vScale(40),
    },
    textContainer: {
        gap: vScale(30),
        paddingBottom: vScale(30),
    },
});
export const LoginPage = (): JSX.Element => {
    const navigation = useAppStore((state) => state.navigation);
    const updateUserInfo = useAppStore((state) => state.updateUserInfo);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isUsername, setIsUsername] = useState<boolean>(true);
    const [isLoginInProgress, setIsLoginInProgress] = useState<boolean>(false);

    const generatePasswordToShow = (password: string) => {
        const len = password.length;
        const lastChar = password.substring(len - 1);
        return '*'.repeat(len - 1) + lastChar;
    };

    const onPressKeyboardButton = (char: string): void => {
        if (isUsername) {
            switch (char) {
                case 'backspace':
                    setUsername(username.substring(0, username.length - 1));
                    break;
                case 'space':
                    setUsername(username + ' ');
                    break;
                default:
                    setUsername(username + char);
            }
        } else {
            switch (char) {
                case 'backspace':
                    setPassword(password.substring(0, password.length - 1));
                    break;
                case 'space':
                    setPassword(password + ' ');
                    break;
                default:
                    setPassword(password + char);
            }
        }
    };

    const onPressBack = (): void => {
        if (isUsername) {
            navigation.goBack();
        } else {
            setIsUsername(true);
            setPassword('');
        }
    };

    const onPressContinue = (): void => {
        if (isUsername) {
            setIsUsername(false);
        } else {
            setIsLoginInProgress(true);
            loginUser({ username, password })
                .then((res) => {
                    updateUserInfo(res);
                    localStorage.setItem('userInfo', JSON.stringify(res), {
                        accessible: ACCESSIBLE.ALWAYS,
                    });
                    navigation.navigate(RouteNames.HomePage);
                })
                .catch(() => {});
        }
    };

    return (
        <>
            <View style={style.loginPage}>
                <View style={style.firstSection}>
                    <View style={style.textContainer}>
                        <Text style={style.title}>Accedi</Text>
                        <Text style={style.description}>
                            {isUsername
                                ? 'Inserisci il tuo username'
                                : 'Inserisci la tua password'}
                        </Text>
                    </View>
                    <View
                        style={[
                            style.inputContainer,
                            isUsername && { borderColor: AppColors.white },
                        ]}
                    >
                        {!!username.length && (
                            <Text style={style.textInputName}>Username</Text>
                        )}

                        <Text
                            style={[
                                style.text,
                                username === '' && style.textPlaceholder,
                            ]}
                        >
                            {username.length ? username : 'Username'}
                        </Text>
                    </View>
                    {!isUsername && (
                        <View
                            style={[
                                style.inputContainer,
                                { borderColor: AppColors.white },
                            ]}
                        >
                            {!!password.length && (
                                <Text style={style.textInputName}>
                                    Password
                                </Text>
                            )}
                            <Text
                                style={[
                                    style.text,
                                    password === '' && style.textPlaceholder,
                                ]}
                            >
                                {password.length
                                    ? generatePasswordToShow(password)
                                    : 'Password'}
                            </Text>
                        </View>
                    )}
                </View>
                <View style={style.secondSection}>
                    <VirtualKeyboard onPress={onPressKeyboardButton} />
                    <View style={style.ctasContainer}>
                        <View style={style.button}>
                            <Button
                                buttonText={'Indietro'}
                                onPress={onPressBack}
                            />
                        </View>

                        <View style={style.button}>
                            <Button
                                buttonText={'Conferma'}
                                onPress={onPressContinue}
                                opInProg={isLoginInProgress}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};
