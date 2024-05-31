import { View, Text, StyleSheet } from 'react-native';
import { SignInStep } from '../../enums/signIn';
import { AppColors } from '../../enums/colors';
import { hScale, vScale } from '../../helpers/sizeHelper';

const style = StyleSheet.create({
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
    textPlaceholder: {
        color: AppColors.white40,
    },
    text: {
        color: AppColors.white,
        fontSize: vScale(40),
    },
});

interface SignInInputProps {
    activeStep: SignInStep;
    stepToShow: SignInStep;
    text: string;
    textPlaceholder: string;
}

export const SignInInput = (props: SignInInputProps): JSX.Element => {
    return (
        <>
            <View
                style={[
                    style.inputContainer,
                    props.activeStep == props.stepToShow && {
                        borderColor: AppColors.white,
                    },
                ]}
            >
                {!!props.text.length && (
                    <Text style={style.textInputName}>
                        {props.textPlaceholder}
                    </Text>
                )}

                <Text
                    style={[
                        style.text,
                        props.text === '' && style.textPlaceholder,
                    ]}
                >
                    {props.text.length ? props.text : props.textPlaceholder}
                </Text>
            </View>
        </>
    );
};
