import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppColors } from '../../enums/colors';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { Flow } from '../Loaders/Loaders';

const style = StyleSheet.create({
    button: {
        width: '100%',
        height: '100%',
        backgroundColor: AppColors.black60,
        borderRadius: hScale(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonFocused: {
        backgroundColor: AppColors.white,
        transform: [{ scaleY: 1.2 }, { scaleX: 1.05 }],
    },
    text: {
        color: AppColors.white,
        fontSize: vScale(30),
    },
    textFocused: {
        color: AppColors.black,
        transform: [{ scaleY: 0.85 }, { scaleX: 0.96 }],
    },
});

export interface ButtonProps {
    buttonText: string;
    onPress: () => void;
    opInProg?: boolean;
}

export const Button = ({
    buttonText,
    onPress,
    opInProg = false,
}: ButtonProps): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false);
    return (
        <>
            <Pressable
                onFocus={() => {
                    setFocused(true);
                }}
                onBlur={() => {
                    setFocused(false);
                }}
                onPress={() => {
                    onPress();
                }}
            >
                <View style={[style.button, focused && style.buttonFocused]}>
                    {opInProg ? (
                        <Flow
                            size={hScale(50)}
                            colors={[
                                AppColors.black,
                                AppColors.black,
                                AppColors.black,
                            ]}
                        />
                    ) : (
                        <Text
                            style={[style.text, focused && style.textFocused]}
                        >
                            {buttonText}
                        </Text>
                    )}
                </View>
            </Pressable>
        </>
    );
};
