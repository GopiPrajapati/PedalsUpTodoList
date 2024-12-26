import { InputModeOptions, KeyboardTypeOptions, TextStyle, ViewStyle } from "react-native";

export interface InputProps {
    hint?: string;
    value?: string | boolean;
    onChange?: (value: string) => void;
    style?: TextStyle;
    maxLength?: number;
    keyboardType?: KeyboardTypeOptions;
    isPassword?: boolean;
    isLabelShown?: boolean;
    conStyle?: ViewStyle;
    isMandatory?: boolean;
    error?: string;
    multiline?: boolean;
    placeholder?: string;
    onSubmitEditing?: () => void;
    editable?: boolean;
    autoCapitalize?: any
    secureTextEntry?: boolean,
    label?: string,
    errorStyle?: TextStyle
    leftIcon?: JSX.Element
    rightIcon?: JSX.Element
    inputTextCon?: ViewStyle
    labelTextStyle?: TextStyle
    placeHolderTextColor?: string
    inputMode?: InputModeOptions | undefined
}