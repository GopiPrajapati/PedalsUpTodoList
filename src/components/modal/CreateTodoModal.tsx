import React, {FC} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import {CreateTodoModalComponentProps} from '../../interfaces/components/CreateTodoModalComponentProps';
import createTodoModalStyles from '../../styles/components/createTodoModalStyles';
import colors from '../../utility/colors';

const CreateTodoModal: FC<CreateTodoModalComponentProps> = ({
  children,
  style,
  isVisible = false,
  onBackdropPress,
  smallTitle,
  title,
  titleStyle,
  smallTitleStyle,
  childrenConStyle,
  isCrossRequired = true,
  isIgnoreGlobalVisibility = false,
  headerConStyle,
}) => {
  // const {isTempAllModalClosed} = useAppContext();

  return (
    <Modal
      isVisible={isVisible}
      backdropColor={colors.darkBlueBackground}
      avoidKeyboard={true}
      animationIn={'fadeInUpBig'}
      animationOut={'slideOutDown'}>
      <View style={[createTodoModalStyles.feedbackPopUpCon, style]}>
        <View style={[createTodoModalStyles.headerCon, headerConStyle]}>
          <View style={createTodoModalStyles.titleCon}>
            {title != undefined ? (
              <Text
                style={[createTodoModalStyles.title, titleStyle]}
                numberOfLines={3}>
                {title}
              </Text>
            ) : null}
            {smallTitle != undefined ? (
              <Text style={[createTodoModalStyles.smallTitle, smallTitleStyle]}>
                {smallTitle}
              </Text>
            ) : null}
          </View>

          {isCrossRequired ? (
            <TouchableOpacity
              onPress={onBackdropPress}
              style={{marginHorizontal: hp(1)}}>
              <Entypo name="circle-with-cross" style={{fontSize: hp(4)}} />
            </TouchableOpacity>
          ) : null}
        </View>
        <ScrollView
          keyboardDismissMode="interactive"
          style={{flexGrow: 0}}
          keyboardShouldPersistTaps={'handled'}>
          <View style={[createTodoModalStyles.childrenCon, childrenConStyle]}>
            {children}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default CreateTodoModal;
