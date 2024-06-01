import { StyleSheet, View } from 'react-native';
import { hScale, vScale } from '../../helpers/sizeHelper';
import { AppColors } from '../../enums/colors';
import { useEffect, useState } from 'react';

const style = StyleSheet.create({
    rating: {
        width: hScale(20),
        height: vScale(20),
        borderRadius: hScale(15),
    },
});
export const Rating = ({ rating }: { rating: number }): JSX.Element => {
    const [color, setColor] = useState<string>();

    useEffect(() => {
        setColor(
            rating < 1
                ? AppColors.red
                : rating < 5
                  ? AppColors.yellow
                  : AppColors.green
        );
    }, []);

    return (
        <>
            <View style={[style.rating, { backgroundColor: color }]}></View>
        </>
    );
};
