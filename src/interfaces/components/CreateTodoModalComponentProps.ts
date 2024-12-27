import { TextStyle, ViewStyle } from "react-native";

export interface CreateTodoModalComponentProps {
    children?: any,
    style?: ViewStyle,
    isVisible?: boolean | null
    onBackdropPress?: () => void,
    smallTitle?: string | undefined | null,
    title?: string,
    titleStyle?: TextStyle,
    smallTitleStyle?: TextStyle,
    childrenConStyle?: ViewStyle,
    isCrossRequired?: boolean,
    isBackDropPressClose?: boolean,
    isIgnoreGlobalVisibility?: boolean,
    headerConStyle?: ViewStyle | Array<ViewStyle>
}