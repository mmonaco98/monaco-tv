import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type TRouteParams<T> = T & ParamListBase;
export type TNavigation = NativeStackNavigationProp<
    TRouteParams<ReactNavigation.RootParamList>
>;
