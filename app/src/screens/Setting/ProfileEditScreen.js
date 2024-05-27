

import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View,  TextInput, Alert, ActivityIndicator } from 'react-native';
import {  colors, width, height } from '../../assets/globalStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BasicButton from '../../components/BasicButton';
import { AuthContext } from '../../../AuthProvider';
import { useNavigation } from '@react-navigation/native';

export default function ProfileEditScreen() {

  
  const { updateProfile, userName, userTel, loading } = useContext(AuthContext);

  const [inputName, setInputName] = useState(userName);
  const [inputTel, setInputTel] = useState(userTel);

  const[nicknameTF,setNicknameTF] = useState(true);
  const[telTF,setTelTF] = useState(true);

  const [buttonColor, setButtonColor] = useState(colors.gray);
  const [buttonAble, setBttonAble] = useState(true);


  const navigation = useNavigation();

  useEffect(() => {

    if (telTF==true && nicknameTF ==true) {
      setButtonColor(colors.loginBlue);
      setBttonAble(false);
    }
    else {
      setButtonColor(colors.gray);
      setBttonAble(true);
    }
  })

  if (loading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>로딩 중...</Text>
        </View>
    );
}

  function is_tel(asValue) {
    //전화번호 길이 바꾸기
    var regExp = /^010\d{8}$/;
    return regExp.test(asValue);
  }
  function is_nickname(asValue) {
    var regExp = /^.{1,8}$/;
    return regExp.test(asValue);
  }

  function update() {
    Alert.alert(
      '프로필 변경',
      '변경하시겠습니까?',
      [
        {
          text: '확인', onPress:  () => {
            console.log(inputName, inputTel)
            updateProfile(inputName,inputTel)
          }
        }, { text: '취소' }
      ],
    )

  }

  //nickname 조건 Check part
  const handleNicknameValue = (text) => {
    setInputName(text);
    if (is_nickname(text)) {
      setNicknameTF(true);
    }
    else if (!is_nickname(text)) {
      setNicknameTF(false);
    }
  }

  //tel 조건 Check part
  const handleTelValue = (text) => {
    setInputTel(text);
    if (is_tel(text)) {
      setTelTF(true);
    }
    else if (!is_tel(text)) {
      setTelTF(false);
    }
  }



  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{paddingTop:height* 230 }}>
        <View style={{alignItems:'center'}}>
      <View style={styles.inputArea}>
        <Text style={{ color: colors.textGray, fontSize: width * 25, marginRight:width*20 }}>닉네임 :</Text>
        <TextInput
          style={styles.textBox}
          autoCapitalize='none'
          onChangeText={handleNicknameValue}
          value={inputName}
        />
        </View>
        <View style={styles.inputArea}>
        <Text style={{ color: colors.textGray, fontSize: width * 25 }}>전화번호 :</Text>
        <TextInput
          style={styles.textBox}
          autoCapitalize='none'
          onChangeText={handleTelValue}
          value={inputTel}
        />
      </View>
      <View style={styles.buttonArea}>
        <BasicButton category={'sideMargin'} color={colors.highlightBlue} size={100} title={"취소"} onPress={()=>{navigation.goBack()}}  />
        <BasicButton category={'sideMargin'} color={buttonColor} size={100} title={"저장"} able={buttonAble} onPress={()=>{update()}} />
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
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contentsArea: {
    alignItems: 'center',
    flex: 1,
  },
  inputArea: {
    width: width * 400,
    height: height * 70,
    marginBottom: height * 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonArea: {
    width: width * 300,
    height: height * 60,
    marginTop: height * 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom:height*200,
    
  },
  textStyle:
  {
    fontWeight: 'bold',
    color: 'white',
    fontSize: width * 15
  },
  textBox: {
    fontFamily: "NanumSquareRoundEB",
    fontSize: 15,
    backgroundColor: colors.inputBoxColor,
    width: width * 220,
    height: height * 50,
    borderRadius: 7,
    paddingLeft: 10,
    marginLeft: width * 10,
  }
});
