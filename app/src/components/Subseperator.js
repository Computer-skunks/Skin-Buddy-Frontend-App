import { StyleSheet, View } from "react-native"
import { colors, width, height } from '../assets/globalStyles';

export default function Subseperator({type}) {
    if(type=='thin'){

        return (
            <View style={styles.subseperatorThin}></View>
        )
    }

    return (
        <View style={styles.subseperator}></View>
    )
}
const styles = StyleSheet.create({

    subseperator: {
        backgroundColor: colors.darkGray,
        width: width * 365,
        height: height * 2,
    },
    subseperatorThin: {
        backgroundColor: colors.darkGray,
        width: width * 360,
        height: height * 1,
    }
})