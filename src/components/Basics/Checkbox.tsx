import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppColors } from '../../enums/colors';
import { hScale, vScale } from '../../helpers/sizeHelper';

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        gap: hScale(20),
    },

    checkbox: {
        width: hScale(30),
        height: vScale(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: hScale(2),
        borderColor: AppColors.white,
        borderRadius: hScale(7),
    },
    icon: {
        tintColor: AppColors.white,
        width: hScale(30),
        height: vScale(30),
    },
    text: {
        fontSize: vScale(35),
        color: AppColors.white,
        textDecorationLine: 'none',
    },
    focusedText: {
        textDecorationLine: 'underline',
    },
});

export const Checkbox = ({
    checkValue,
    selectedValue,
    onPress,
    text,
}: {
    checkValue: any;
    selectedValue: any;
    onPress: () => void;
    text: string;
}): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false);
    const [checked, setCheched] = useState<boolean>(false);

    useEffect(() => {
        setCheched(checkValue === selectedValue);
    }, [selectedValue]);

    return (
        <>
            <Pressable
                onFocus={() => {
                    setFocused(true);
                }}
                onBlur={() => {
                    setFocused(false);
                }}
                onPress={onPress}
            >
                <View style={style.container}>
                    <View style={style.checkbox}>
                        {checked && (
                            <Image
                                source={require('./../../assets/icons/done.png')}
                                style={{
                                    tintColor: AppColors.white,
                                    width: hScale(30),
                                    height: vScale(30),
                                }}
                            />
                        )}
                    </View>
                    <View>
                        <Text
                            style={[style.text, focused && style.focusedText]}
                        >
                            {text}
                        </Text>
                    </View>
                </View>
            </Pressable>
        </>
    );
};
