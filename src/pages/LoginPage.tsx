import { StyleSheet, Text, View } from 'react-native';
import { AppColors } from '../enums/colors';
import { VirtualKeyboard } from '../components/VirtualKeyboard/VirtualKeyboard';
import { Button } from '../components/Basics/Button';
import { hScale, vScale } from '../helpers/sizeHelper';
import { useState } from 'react';
import { useAppStore } from '../stores/appStores';
import { RouteNames } from '../enums/navigation';
import RNSecureStorage from 'rn-secure-storage';

const style = StyleSheet.create({
    loginPage: {
        width: '100%',
        height: '100%',
        backgroundColor: AppColors.background,
        flexDirection: 'row',
    },
    section: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: hScale(335),
        height: vScale(60),
    },
});
export const LoginPage = (): JSX.Element => {
    const navigation = useAppStore((state) => state.navigation);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isUsername, setIsUsername] = useState<boolean>(true);

    return (
        <>
            <View style={style.loginPage}>
                <View style={style.section}>
                    <View>
                        <Text style={{ color: AppColors.white }}>
                            {username}
                        </Text>
                    </View>
                    <View>
                        <Text style={{ color: AppColors.white }}>
                            {password}
                        </Text>
                    </View>
                </View>
                <View
                    style={[
                        style.section,
                        { backgroundColor: AppColors.white20, gap: vScale(50) },
                    ]}
                >
                    <VirtualKeyboard
                        onPress={(char: string) => {
                            if (isUsername) {
                                setUsername(username + char);
                            } else {
                                setPassword(password + char);
                            }
                        }}
                    />
                    <View style={{ flexDirection: 'row', gap: hScale(20) }}>
                        <View style={style.button}>
                            <Button
                                buttonText={'Indietro'}
                                onPress={() => {
                                    if (isUsername) {
                                        navigation.goBack();
                                    } else {
                                        setIsUsername(true);
                                    }
                                }}
                            />
                        </View>

                        <View style={style.button}>
                            <Button
                                buttonText={'Conferma'}
                                onPress={() => {
                                    if (isUsername) {
                                        setIsUsername(false);
                                    } else {
                                        navigation.navigate(
                                            RouteNames.HomePage
                                        );
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};
