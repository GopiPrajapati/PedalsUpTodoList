import React from 'react';
import {StyleSheet, View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../utility/colors';

const Card = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  container: {
    borderRadius: hp(1.1),
    backgroundColor: colors.white,
    shadowOffset: {width: 0, height: 0},
    shadowColor: colors.primary,
    shadowRadius: 2,
    shadowOpacity: 0.3,
    zIndex: 5,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: colors.gray,
  },
});
