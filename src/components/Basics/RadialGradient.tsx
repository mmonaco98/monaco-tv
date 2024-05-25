import {
    Defs,
    Rect,
    RadialGradient as SVGRadialGradient,
    Stop,
    Svg,
    type NumberProp,
} from 'react-native-svg';

export interface TColorList {
    offset: string;
    color: string;
    opacity: string;
}
export interface RadialGradientProps {
    cx: NumberProp;
    cy: NumberProp;
    rx: NumberProp;
    ry: NumberProp;
    colorList: Array<TColorList>;
}

export const RadialGradient = ({
    cx,
    cy,
    rx,
    ry,
    colorList,
}: RadialGradientProps): JSX.Element => {
    return (
        <Svg height="100%" width="100%">
            <Defs>
                <SVGRadialGradient
                    id="grad"
                    cx={cx}
                    cy={cy}
                    rx={rx}
                    ry={ry}
                    gradientUnits="userSpaceOnUse"
                >
                    {colorList.map((value, index) => (
                        <Stop
                            key={`RadialGradientItem_${index}`}
                            offset={value.offset}
                            stopColor={value.color}
                            stopOpacity={value.opacity}
                        />
                    ))}
                </SVGRadialGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
        </Svg>
    );
};
