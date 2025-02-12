import {
    Defs,
    Rect,
    LinearGradient as SVGLinearGradient,
    Stop,
    Svg,
    type NumberProp,
} from 'react-native-svg';
import { TColorList } from '../../types/common';
import { View } from 'react-native';

export interface LinearGradientProps {
    x1: NumberProp;
    x2: NumberProp;
    y1: NumberProp;
    y2: NumberProp;
    colorList: Array<TColorList>;
    children?: any;
    style: any;
}

export const LinearGradient = ({
    x1,
    x2,
    y1,
    y2,
    colorList,
    style,
    children,
}: LinearGradientProps): JSX.Element => {
    return (
        <View style={style}>
            <Svg height="100%" width="100%">
                <Defs>
                    <SVGLinearGradient
                        id="grad"
                        x1={x1}
                        x2={x2}
                        y1={y1}
                        y2={y2}
                        gradientUnits="userSpaceOnUse"
                    >
                        {colorList.map((value, index) => (
                            <Stop
                                key={`LinearGradientItem_${index}`}
                                offset={value.offset}
                                stopColor={value.color}
                                stopOpacity={value.opacity}
                            />
                        ))}
                    </SVGLinearGradient>
                </Defs>
                <Rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="url(#grad)"
                />
                {children}
            </Svg>
        </View>
    );
};
