import React, {FC, useState} from 'react';
import {Text, TextInput, Pressable, View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import Feather from 'react-native-vector-icons/Feather';

// import inputTextStyle from '../../styles/inputTextStyle';

import colors from '../../utility/colors';
import {InputProps} from './InputProps';
import inputTextStyle from '../../styles/components/inputTextStyle';

export interface TextInputContainerProps {
  fontSize?: 100;
}

const Input: FC<InputProps> = ({
  hint,
  value,
  onChange,
  style,
  maxLength,
  keyboardType,
  isPassword,
  isLabelShown = true,
  conStyle = {},
  isMandatory = false,
  error = '',
  multiline = false,
  placeholder = null,
  onSubmitEditing,
  editable = true,
  autoCapitalize = 'sentences',
  label,
  errorStyle,
  leftIcon,
  rightIcon,
  inputTextCon,
  labelTextStyle,
  placeHolderTextColor,
  inputMode,
}) => {
  const [isPassShown, setIsPassShown] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={[inputTextStyle.textCon, conStyle]}>
      {isLabelShown ? (
        <Text style={[inputTextStyle.labelText, labelTextStyle]}>
          {label ? label : hint}
          {isMandatory ? (
            <Text style={[inputTextStyle.error, errorStyle]}>{` *`}</Text>
          ) : null}
        </Text>
      ) : null}
      <View
        style={[
          inputTextStyle.inputCon,
          {borderColor: isFocus ? colors.focusedColor : colors.borderColor},
          inputTextCon,
        ]}>
        {leftIcon ? leftIcon : null}
        <TextInput
          placeholderTextColor={
            placeHolderTextColor ? placeHolderTextColor : colors.hintColor
          }
          placeholder={placeholder ?? hint}
          style={[inputTextStyle.input, style]}
          value={value}
          onChangeText={onChange}
          maxLength={maxLength}
          secureTextEntry={isPassword && !isPassShown}
          keyboardType={keyboardType}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          onSubmitEditing={onSubmitEditing}
          editable={editable}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          inputMode={inputMode}
        />
        {rightIcon ? rightIcon : null}
        {isPassword ? (
          <Pressable onPress={() => setIsPassShown(!isPassShown)}>
            <Feather
              name={isPassShown ? 'eye-off' : 'eye'}
              style={inputTextStyle.icon}
              size={hp(3)}
            />
          </Pressable>
        ) : null}
      </View>

      {error ? <Text style={inputTextStyle.error}>{error}</Text> : null}
    </View>
  );
};
export default Input;
