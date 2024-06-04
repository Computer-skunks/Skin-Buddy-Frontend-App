import React from 'react';
import { StyleSheet, View,  } from 'react-native';
import MbtiTestPaper from '../../components/MbtiTestPaper'

export default function MbtiTestPaperScreen() {


  return (
    <View style={styles.container}>
      <MbtiTestPaper></MbtiTestPaper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'columm',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



