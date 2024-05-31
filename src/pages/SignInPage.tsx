import { StyleSheet, View, Text } from 'react-native';
import { AppColors } from '../enums/colors';
import { hScale, vScale } from '../helpers/sizeHelper';
import { VirtualKeyboard } from '../components/VirtualKeyboard/VirtualKeyboard';
import { Button } from '../components/Basics/Button';
import { useEffect, useState } from 'react';
import { SignInStep } from '../enums/signIn';
import { SignInInput } from '../components/SignInInput/SignInInput';
import { useAppStore } from '../stores/appStores';
import { TGender } from '../enums/user';
import { Checkbox } from '../components/Basics/Checkbox';
import { AvatarGrid } from '../components/AvatarGrid/AvatarGrid';
import { Avatar } from '../components/AvatarGrid/Avatar';
import { TUser } from '../types/user';
import {
    createHomepage,
    createUser,
    getHomepageByUserId,
} from '../utils/rest-api';
import { ACCESSIBLE, default as localStorage } from 'rn-secure-storage';
import { RouteNames } from '../enums/navigation';

const style = StyleSheet.create({
    signInPage: {
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
        position: 'absolute',
        bottom: vScale(50),
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
    text: {
        color: AppColors.white,
        fontSize: vScale(40),
    },
    textPlaceholder: {
        color: AppColors.white40,
    },
    inputsWrapper: {
        gap: vScale(30),
    },
    genderButton: { width: hScale(500), height: vScale(80) },
});

export const SignInPage = (): JSX.Element => {
    const navigation = useAppStore((state) => state.navigation);
    const updateUserInfo = useAppStore((state) => state.updateUserInfo);
    const updateHomepage = useAppStore((state) => state.updateHomepage);
    const [step, setStep] = useState<SignInStep>(SignInStep.Name);
    const [nStep, setNStep] = useState<number>(1);
    const [description, setDescription] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [mail, setMail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [gender, setGender] = useState<TGender>();
    const [avatar, setAvatar] = useState<string>('');
    const [isSignInProgress, setIsSignInProgress] = useState<boolean>(false);

    useEffect(() => {
        let desc = '';
        switch (step) {
            case SignInStep.Name:
                desc = 'Inserisci il tuo nome';
                break;
            case SignInStep.Mail:
                desc = 'Inserisci la tua Email';
                break;
            case SignInStep.Username:
                desc = 'Inserisci il tuo username';
                break;
            case SignInStep.Password:
                desc = 'Inserisci la tua password';
                break;
            case SignInStep.Age:
                desc = 'Inserisci la tua età';
                break;
            case SignInStep.Gender:
                desc = 'Inserisci il tuo sesso';
                break;
            case SignInStep.Avatar:
                desc = 'Scegli il tuo avatar';
                break;
            case SignInStep.Confirm:
                desc = 'Conferma le tue scelte';
                break;
        }
        setDescription(desc);
    }, [step]);

    const setNewName = (char: string): void => {
        switch (char) {
            case 'backspace':
                setName(name.substring(0, name.length - 1));
                break;
            case 'space':
                setName(name + ' ');
                break;
            default:
                setName(name + char);
        }
    };

    const setNewMail = (char: string): void => {
        switch (char) {
            case 'backspace':
                setMail(mail.substring(0, mail.length - 1));
                break;
            case 'space':
                setMail(mail + ' ');
                break;
            default:
                setMail(mail + char);
        }
    };

    const setNewUsername = (char: string): void => {
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
    };

    const setNewPassword = (char: string): void => {
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
    };

    const setNewAge = (char: string): void => {
        if (
            ![
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                'backspace',
            ].includes(char)
        ) {
            return;
        }
        switch (char) {
            case 'backspace':
                setAge(age.substring(0, age.length - 1));
                break;
            default:
                setAge(age + char);
        }
    };

    const setNewGender = (gender: TGender): void => {
        setGender(gender);
    };

    const onPressKeyboardButton = (char: string): void => {
        switch (step) {
            case SignInStep.Name:
                setNewName(char);
                break;
            case SignInStep.Mail:
                setNewMail(char);
                break;
            case SignInStep.Username:
                setNewUsername(char);
                break;
            case SignInStep.Password:
                setNewPassword(char);
                break;
            case SignInStep.Age:
                setNewAge(char);
                break;
        }
    };

    const onPressBack = (): void => {
        let prevStep: SignInStep;
        switch (step) {
            case SignInStep.Confirm:
                prevStep = SignInStep.Avatar;
                break;
            case SignInStep.Avatar:
                prevStep = SignInStep.Gender;
                setAvatar('');
                break;
            case SignInStep.Gender:
                prevStep = SignInStep.Age;
                setGender(null);
                break;
            case SignInStep.Age:
                prevStep = SignInStep.Password;
                setAge('');
                break;
            case SignInStep.Password:
                prevStep = SignInStep.Username;
                setPassword('');
                break;

            case SignInStep.Username:
                prevStep = SignInStep.Mail;
                setUsername('');
                break;

            case SignInStep.Mail:
                prevStep = SignInStep.Name;
                setMail('');
                break;
            case SignInStep.Name:
                navigation.goBack();
                break;
        }
        setStep(prevStep);
        setNStep(nStep - 1);
    };

    const onPressContinue = (): void => {
        let nextStep: SignInStep;
        let value: string;
        switch (step) {
            case SignInStep.Name:
                value = name;
                nextStep = SignInStep.Mail;
                break;
            case SignInStep.Mail:
                value = mail;
                nextStep = SignInStep.Username;
                break;
            case SignInStep.Username:
                value = username;
                nextStep = SignInStep.Password;
                break;
            case SignInStep.Password:
                value = password;
                nextStep = SignInStep.Age;
                break;
            case SignInStep.Age:
                value = age;
                nextStep = SignInStep.Gender;
                break;
            case SignInStep.Gender:
                value = gender;
                nextStep = SignInStep.Avatar;
                break;
            case SignInStep.Avatar:
                value = avatar;
                nextStep = SignInStep.Confirm;
                break;
            case SignInStep.Confirm:
                createNewUser();
        }
        if (step !== SignInStep.Confirm) {
            if (value.length) {
                setStep(nextStep);
                setNStep(nStep + 1);
            }
        }
    };

    const getHomepage = async (user: TUser) => {
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
    };

    const createNewUser = async (): Promise<void> => {
        const user: TUser = {
            id: null,
            name,
            mail,
            gender,
            age: parseInt(age),
            avatar,
            password,
            username,
        };
        setIsSignInProgress(true);
        createUser(user)
            .then((res) => {
                if (res) {
                    updateUserInfo(res);
                    localStorage.setItem('userInfo', JSON.stringify(res), {
                        accessible: ACCESSIBLE.ALWAYS,
                    });
                    createHomepage(res.id).then(() => {
                        setTimeout(() => {
                            getHomepage(res);
                        }, 10000);
                    });
                }
            })
            .catch((err) => {});
    };

    return (
        <>
            <View style={style.signInPage}>
                <View style={style.firstSection}>
                    <View style={style.textContainer}>
                        <Text style={style.title}>Registrati</Text>
                        <Text style={style.description}>{description}</Text>
                    </View>
                    <View style={style.inputsWrapper}>
                        {nStep === 1 && (
                            <SignInInput
                                activeStep={step}
                                stepToShow={SignInStep.Name}
                                text={name}
                                textPlaceholder={'Nome'}
                            />
                        )}
                        {[2, 8].includes(nStep) && (
                            <SignInInput
                                activeStep={step}
                                stepToShow={SignInStep.Mail}
                                text={mail}
                                textPlaceholder={'Email'}
                            />
                        )}
                        {[3, 8].includes(nStep) && (
                            <SignInInput
                                activeStep={step}
                                stepToShow={SignInStep.Username}
                                text={username}
                                textPlaceholder={'Username'}
                            />
                        )}
                        {[4, 8].includes(nStep) && (
                            <SignInInput
                                activeStep={step}
                                stepToShow={SignInStep.Password}
                                text={password}
                                textPlaceholder={'Password'}
                            />
                        )}
                        {[5, 8].includes(nStep) && (
                            <SignInInput
                                activeStep={step}
                                stepToShow={SignInStep.Age}
                                text={age}
                                textPlaceholder={'Età'}
                            />
                        )}
                    </View>
                </View>
                <View style={style.secondSection}>
                    {![
                        SignInStep.Gender,
                        SignInStep.Avatar,
                        SignInStep.Confirm,
                    ].includes(step) && (
                        <VirtualKeyboard onPress={onPressKeyboardButton} />
                    )}
                    {step === SignInStep.Gender && (
                        <View style={{ gap: vScale(30) }}>
                            <View style={style.genderButton}>
                                <Checkbox
                                    checkValue={TGender.M}
                                    selectedValue={gender}
                                    onPress={() => {
                                        setNewGender(TGender.M);
                                    }}
                                    text={'Maschio'}
                                />
                            </View>

                            <View style={style.genderButton}>
                                <Checkbox
                                    checkValue={TGender.F}
                                    selectedValue={gender}
                                    onPress={() => {
                                        setNewGender(TGender.F);
                                    }}
                                    text={'Femmina'}
                                />
                            </View>
                            <View style={style.genderButton}>
                                <Checkbox
                                    checkValue={TGender.N}
                                    selectedValue={gender}
                                    onPress={() => {
                                        setNewGender(TGender.N);
                                    }}
                                    text={'Non rispondere'}
                                />
                            </View>
                        </View>
                    )}
                    {step === SignInStep.Avatar && (
                        <>
                            <AvatarGrid
                                avatar={avatar}
                                onPress={(av: string) => {
                                    setAvatar(av);
                                }}
                            ></AvatarGrid>
                        </>
                    )}
                    {step === SignInStep.Confirm && (
                        <>
                            <Avatar
                                focused={false}
                                selected={true}
                                source={avatar}
                                name={name}
                            />
                        </>
                    )}
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
                                opInProg={isSignInProgress}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};
