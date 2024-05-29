import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { KeyboardButton } from './KeyboardButton';

const CHAR_LOWCASE = [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['toSpec', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
    ['toUpCaseDisabled', '_', '-', 'space', '.', '@', 'toUpCaseDisabled'],
];

const CHAR_UPCASE = [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['toSpec', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'backspace'],
    ['toUpCaseEnabled', '_', '-', 'space', '.', '@', 'toUpCaseEnabled'],
];

const CHAR_SPEC = [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['<', '>', '/', '|', '"', "'", '^', '(', ')', '['],
    [']', '{', '}', '%', '$', '€', '&', '*', '#'],
    ['toChar', '=', '+', ',', ':', ';', '?', '!', 'backspace'],
    ['_', '-', 'space', '.', '@'],
];

const style = StyleSheet.create({
    keyboard: {
        flexDirection: 'column',
        gap: vScale(10),
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        gap: hScale(10),
    },
});

export const VirtualKeyboard = ({
    onPress,
}: {
    onPress: (char: string) => void;
}): React.JSX.Element => {
    const [activeKeyboard, setActiveKeyboard] =
        useState<Array<Array<string>>>(CHAR_LOWCASE);

    const handleChangeKeyboard = (buttonId: string): void => {
        switch (buttonId) {
            case 'toChar':
            case 'toUpCaseEnabled':
                setActiveKeyboard(CHAR_LOWCASE);
                break;
            case 'toUpCaseDisabled':
                setActiveKeyboard(CHAR_UPCASE);
                break;
            case 'toSpec':
                setActiveKeyboard(CHAR_SPEC);
                break;
            default:
                onPress(buttonId);
        }
    };
    return (
        <View style={style.keyboard}>
            {activeKeyboard.map((keyboard, index) => {
                return (
                    <View key={'row_' + index} style={style.row}>
                        {keyboard.map((char, index) => {
                            return (
                                <KeyboardButton
                                    key={'button_' + index}
                                    char={char}
                                    onPress={handleChangeKeyboard}
                                />
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
};
