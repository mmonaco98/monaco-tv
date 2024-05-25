import { View, StyleSheet, Text, Dimensions, TextStyle } from 'react-native';
import { Size } from '../../types/common';
import { hScale } from '../../helpers/sizeHelper';

export const Label = ({
    bgColor,
    labelText,
    size,
    textStyle,
}: {
    bgColor: string;
    labelText: string;
    size: Size;
    textStyle: TextStyle;
}): JSX.Element => {
    const style = StyleSheet.create({
        container: {
            backgroundColor: bgColor,
            width: size.width,
            height: size.height,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: hScale(15),
        },
    });
    return (
        <>
            <View style={style.container}>
                <Text style={textStyle}>{labelText}</Text>
            </View>
        </>
    );
};
