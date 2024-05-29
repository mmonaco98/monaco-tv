import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';
import { useState } from 'react';

const style = StyleSheet.create({
    buttonWrapper: {
        width: hScale(60),
        height: vScale(60),
        borderRadius: hScale(8),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.black60,
    },
    focused: {
        backgroundColor: 'white',
    },
    icon: {
        width: hScale(40),
        height: vScale(40),
    },
    iconFocused: {
        tintColor: AppColors.black,
    },
    text: {
        fontSize: vScale(35),
        color: AppColors.white,
        textAlign: 'center',
    },
});

export type TKeyboardButtonProps = {
    char: string;
    onPress: (text: string) => void;
};

export const KeyboardButton = (props: TKeyboardButtonProps): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false);
    const icon_space = './../../assets/icons/space.png';
    const icon_backspace = './../../assets/icons/backspace.png';
    const icon_uppercase = './../../assets/icons/uppercase.png';
    const icon_uppercaseSel = './../../assets/icons/uppercaseSelected.png';
    const isButtonLarge = [
        'toSpec',
        'toChar',
        'backspace',
        'toUpCaseDisabled',
        'toUpCaseEnabled',
    ].includes(props.char);
    const isButtonSpace = props.char === 'space';

    return (
        <Pressable
            onPress={() => {
                props.onPress(props.char);
            }}
            onFocus={() => {
                setFocused(true);
            }}
            onBlur={() => {
                setFocused(false);
            }}
        >
            <View
                style={[
                    style.buttonWrapper,
                    focused && style.focused,
                    isButtonLarge && { width: hScale(95) },
                    isButtonSpace && { width: hScale(200) },
                ]}
            >
                {props.char.length === 1 && (
                    <Text
                        style={[
                            style.text,
                            focused && { color: AppColors.black },
                        ]}
                    >
                        {props.char}
                    </Text>
                )}
                {props.char === 'backspace' && (
                    <Image
                        source={require(icon_backspace)}
                        resizeMode="contain"
                        style={[style.icon, focused && style.iconFocused]}
                    />
                )}
                {props.char === 'space' && (
                    <Image
                        source={require(icon_space)}
                        resizeMode="contain"
                        style={[style.icon, focused && style.iconFocused]}
                    />
                )}
                {props.char === 'toUpCaseDisabled' && (
                    <Image
                        source={require(icon_uppercase)}
                        resizeMode="contain"
                        style={[style.icon, focused && style.iconFocused]}
                    />
                )}
                {props.char === 'toUpCaseEnabled' && (
                    <Image
                        source={require(icon_uppercaseSel)}
                        resizeMode="contain"
                        style={[style.icon, focused && style.iconFocused]}
                    />
                )}
                {props.char === 'toSpec' && (
                    <Text
                        style={[
                            style.text,
                            focused && { color: AppColors.black },
                        ]}
                    >
                        !#+
                    </Text>
                )}
                {props.char === 'toChar' && (
                    <Text
                        style={[
                            style.text,
                            focused && { color: AppColors.black },
                        ]}
                    >
                        abc
                    </Text>
                )}
            </View>
        </Pressable>
    );
};
