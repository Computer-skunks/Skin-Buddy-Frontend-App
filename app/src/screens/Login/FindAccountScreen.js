
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputTextBox from '../../components/InputTextBox';
import { styleG, colors, width, height } from '../../assets/globalStyles';
import FindId from '../../components/FindId';
import FindPassword from '../../components/FindPassword';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function App() {
  const [idButtonType, setIdButtonType]=useState(true)
  const [pwdButtonType, setPwdButtonType]=useState(false)

  const navigation = useNavigation();

  const handleFindId=()=>{
    setIdButtonType(true)
    setPwdButtonType(false)
  }

  const handleFindPwd=()=>{
    setPwdButtonType(true)
    setIdButtonType(false)
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{ height: height * 100 }}>
      <View style={styles.contentsArea}>
        <View style={styles.logoArea}>
          <Image style={styles.logo} source={require("../../assets/img/SkinBuddy_logo.png")}></Image>
        </View>
        <View style={styles.componentArea}>
          <View style={styles.changeArea}>
            <TouchableOpacity onPress={handleFindId}>
              {idButtonType ?(
              <View style={[styles.trueButton,{borderTopStartRadius:15}]}><Text style={ [styleG.textBold,{color:'white'}]}>아이디 찾기</Text></View>
              ):(
              <View style={[styles.falseButton,{borderTopStartRadius:15}]}><Text style={ [styleG.textBold,{color:colors.darkGray}]}>아이디 찾기</Text></View>
              )
              }

            </TouchableOpacity>
            <TouchableOpacity onPress={handleFindPwd}>
              {pwdButtonType?(
              <View style={[styles.trueButton,{borderTopEndRadius:15}]}><Text style={ [styleG.textBold,{color:'white'}]}>비밀번호 찾기</Text></View>
              ):(
                <View style={[styles.falseButton,{borderTopEndRadius:15}]}><Text style={ [styleG.textBold,{color:colors.darkGray}]}>비밀번호 찾기</Text></View>
              )}
            </TouchableOpacity>
          </View>
          {idButtonType?(
            <FindId></FindId>
          ):(
            <FindPassword></FindPassword>
          )}
        </View>
      </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  contentsArea: {
    flex: 1,
    alignItems: 'center',
  },
  logoArea: {
    width: 400,
    height: 150,
    marginTop: height * 100,
    alignItems: 'center',
  },
  logo: {
    height: height * 100,
    width: width * 100,
},
changeArea:{
  height:60,
  width: width*380,
  backgroundColor:'white',
  flexDirection:'row',
  borderColor:colors.darkGray,
  borderTopStartRadius:15,
  borderTopEndRadius:15,
  borderLeftWidth:width*1,
  borderTopWidth:width*1,
  borderRightWidth:width*1,
  borderBottomWidth:0,
},
trueButton:{
  backgroundColor:colors.highlightBlue,
  width:width * 189,
  height:height* 60,
  alignItems: 'center',
  justifyContent:'center',
},
falseButton:{
  backgroundColor:'white',
  width:width * 189,
  height:height* 60,
  alignItems: 'center',
  justifyContent:'center',
}

});
