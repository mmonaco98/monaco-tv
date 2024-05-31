import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { KeyboardButton } from './KeyboardButton';
import { CHAR_LOWCASE, CHAR_UPCASE, CHAR_SPEC } from '../../helpers/keyboard';

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
