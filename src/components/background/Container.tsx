import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {FC} from 'react';
import colors from '../../utility/colors';
import {ContainerProps} from '../../interfaces/components/ContainerProps';

export const Container: FC<ContainerProps> = props => {
  return (
    <SafeAreaView style={styles.safeAreaCont}>
      <StatusBar
        hidden={false}
        backgroundColor={colors.backgroundBlue}
        translucent={false}
        barStyle={'dark-content'}
      />

      <View style={[{flex: 1}, props.style]}>{props.children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaCont: {
    flex: 1,
    // backgroundColor: colors.grayBackground,
    backgroundColor: colors.backgroundBlue,
    justifyContent: 'center',
  },
});
