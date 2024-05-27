
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { styleG, width } from '../../assets/globalStyles';

export default function VersionInformationScreen() {

  return (
    <View style={styles.container}>
      <Text style={[styleG.textBold, {fontSize:width * 20}]}>버전: V.0.1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 20
  },

});
