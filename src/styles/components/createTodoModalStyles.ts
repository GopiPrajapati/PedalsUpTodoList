import { Platform, StyleSheet } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import fonts from "../../utility/fonts";
import colors from "../../utility/colors";

export default StyleSheet.create({
    feedbackPopUpCon: {
        backgroundColor: colors.white,
        borderRadius: hp(2),
        overflow: 'hidden',
        elevation: 8,
    },

    smallTitle: {
        fontFamily: fonts.rubikRegular,
        color: colors.white,
        fontSize: hp(2),
    },
    title: {
        fontSize: hp(2.3),
        marginHorizontal: wp(6),
        color: colors.headingText,
        fontFamily: fonts.rubikMedium
    },
    icon: { color: colors.headingText, fontSize: hp(3.2), paddingHorizontal: wp(1.6) },
    headerCon: {
        paddingVertical: hp(0.5),
        flexDirection: 'row',
    },
    childrenCon: { paddingHorizontal: wp(5) },
    crossIcon: {
        paddingEnd: wp(2),
        paddingHorizontal: wp(1),
        justifyContent: 'center',
    },
    additionSmallTitleStyle: {
        marginTop: Platform.OS == 'ios' ? hp(0) : hp(-0.8),
        marginStart: wp(5),
    },
    titleCon: { flex: 1 }
});
