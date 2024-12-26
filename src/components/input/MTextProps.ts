import { TextProps } from "react-native";

export interface MTextProps extends TextProps {
    props?: any;
    kind?: 'h1' | 'h2' | 'h3' | 'h4' | 'desc' | 'button_label' | 'line' | 'small' | 'label' | 'tiny' | 'medium';
    color?: string;
    children?: any;
    ellipseEnd?: boolean;
}