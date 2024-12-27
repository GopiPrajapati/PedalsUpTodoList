import { StyleSheet } from "react-native";

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../utility/colors";
import fonts from "../../utility/fonts";

export default StyleSheet.create({
    inputCon: {
        marginTop: hp(0),
        borderRadius: hp(1.1),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingHorizontal: wp(2),
        shadowOffset: { width: 0, height: 0 },
        shadowColor: colors.borderColor,
        shadowRadius: 2,
        shadowOpacity: 1,
        elevation: 5,
        borderWidth: hp(0.2),
        borderColor: colors.borderColor,
    },
    input: {
        fontSize: hp(1.8),
        fontFamily: fonts.rubikMedium,
        color: colors.black,
        textAlignVertical: 'center',
        paddingVertical: hp(1.4),
        paddingHorizontal: wp(2.5),
        borderRadius: hp(1),
        flex: 1,
    },
    labelText: {
        // color: colors.labelColor,
        color: colors.black,
        // color: colors.white,
        marginBottom: hp(0.8),
        fontSize: hp(1.7),
        fontFamily: fonts.rubikSemiBold,
    },
    error: {
        marginTop: hp(1.5),
        color: colors.red,
        fontSize: hp(1.6)
    },
    icon: {
        color: colors.eyeColor,
        marginEnd: wp(2.5),
    },
    textCon: {
        marginTop: hp(2)
    },
})