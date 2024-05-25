import { View, StyleSheet, Text } from 'react-native';
import { hScale } from '../../helpers/sizeHelper';
import { LinearGradient } from '../Basics/LinearGradient';
import { TColorList } from '../../types/common';
import { AppColors } from '../../enums/colors';

const style = StyleSheet.create({
    sideMenu: {
        width: hScale(150),
        height: '100%',
        borderWidth: 1,
        borderRightColor: 'green',
    },
});
export const SideMenu = (): JSX.Element => {
    const gradientColors: TColorList[] = [
        { opacity: '1', color: AppColors.background, offset: '70%' },
        { opacity: '.8', color: AppColors.background, offset: '20%' },
        { opacity: '.4', color: AppColors.background, offset: '5%' },
        { opacity: '0.1', color: AppColors.background, offset: '0%' },
    ];
    return (
        <>
            <View style={style.sideMenu}>
                <LinearGradient
                    x1={'100%'}
                    x2={'0%'}
                    y1={'100%'}
                    y2={'100%'}
                    colorList={gradientColors}
                ></LinearGradient>
            </View>
        </>
    );
};
