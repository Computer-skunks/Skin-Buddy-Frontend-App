

import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { colors, width, height } from '../../assets/globalStyles';


import BasicButton from '../../components/BasicButton';
import { AuthContext } from '../../../AuthProvider';

export default function DeleteAccountScreen() {

  const { deleteAccount } = useContext(AuthContext);

  const [inputPw, setInputPw] = useState('');

  const [pwTextColor, setPwTextColor] = useState(colors.textGray);
  const [buttonColor, setButtonColor] = useState(colors.gray);
  const [buttonAble, setBttonAble] = useState(true);

  useEffect(() => {
    if (pwTextColor == colors.highlightBlue) {
      setButtonColor(colors.loginBlue);
      setBttonAble(false);
    }
    else {
      setButtonColor(colors.gray);
      setBttonAble(true);
    }
  })

  function goDelete() {
    Alert.alert(
      '계정 탈퇴',
      '정말 탈퇴 하시겠습니까?',
      [
        {
          text: '확인', onPress:  () => {
            deleteAccount(inputPw)
          }
        }, { text: '취소' }
      ],
    )
  }

  function is_pw(asValue) {
    var regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!?()$#^*~%&@])[a-zA-Z][a-zA-Z0-9!?()$#^*~%&@]{7,19}$/;
    return regExp.test(asValue);
  }

  //pw 조건 Check part
  const handlePwValue = (text) => {
    setInputPw(text);
    if (is_pw(text)) {
      setPwTextColor(colors.highlightBlue);
    }
    else if (!is_pw(text)) {
      setPwTextColor(colors.highlightRed);
    }
  }

  return (
    
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <Text style={{ color: colors.textGray, fontSize: width * 25 }}>비밀번호 :</Text>
        <TextInput
          style={styles.textBox}
          secureTextEntry={true}
          autoCapitalize='none'
          onChangeText={handlePwValue}
          value={inputPw}
        />
      </View>
      <View style={styles.buttonArea}>
        <BasicButton color={buttonColor} size={100} title={"탈퇴"} able={buttonAble} onPress={goDelete} />
      </View>
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
    marginBottom: height * 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonArea: {
    width: width * 300,
    height: height * 60,
    marginTop: height * 10,
    justifyContent: 'center',
    alignItems: 'center'
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
