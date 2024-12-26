import React, {FC} from 'react';
import {Text} from 'react-native';
import mTextStyle from '../../styles/components/mTextStyle';
import {MTextProps} from '../input/MTextProps';

const getStyle = (kind: string) => {
  switch (kind) {
    case 'h1':
      return mTextStyle.h1;
    case 'h2':
      return mTextStyle.h2;
    case 'h3':
      return mTextStyle.h3;
    case 'h4':
      return mTextStyle.h4;
    case 'desc':
      return mTextStyle.desc;
    case 'button_label':
      return mTextStyle.buttonLabel;
    case 'line':
      return mTextStyle.line;
    case 'small':
      return mTextStyle.small;
    case 'label':
      return mTextStyle.label;
    case 'tiny':
      return mTextStyle.tiny;
    case 'medium':
      return mTextStyle.medium;
    default:
      return mTextStyle.body;
  }
};

const MText: FC<MTextProps> = props => {
  return (
    <>
      {props.ellipseEnd ? (
        <Text
          {...props}
          style={[
            getStyle(props.kind ?? ''),
            props.color ? {color: props.color} : {},
            props.style ?? {},
          ]}
          ellipsizeMode="tail">
          {props.children}
        </Text>
      ) : (
        <Text
          {...props}
          style={[
            getStyle(props.kind ?? ''),
            props.color ? {color: props.color} : {},
            props.style ?? {},
          ]}>
          {props.children}
        </Text>
      )}
    </>
  );
};

export default MText;
