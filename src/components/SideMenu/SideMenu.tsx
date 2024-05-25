import { View, StyleSheet } from 'react-native';
import { hScale } from '../../helpers/sizeHelper';

const style = StyleSheet.create({
    sideMenu: {
        width: hScale(150),
        height: '100%',
        borderWidth: 1,
        borderRightColor: 'green',
    },
});
export const SideMenu = (): JSX.Element => {
    return (
        <>
            <View style={style.sideMenu}></View>
        </>
    );
};
