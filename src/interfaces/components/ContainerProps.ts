import { ViewStyle } from "react-native";

export interface ContainerProps {
    style?: ViewStyle
    children?: any;
    isBarHidden?: boolean;
    barColor?: string,
    translucent?: boolean,
}