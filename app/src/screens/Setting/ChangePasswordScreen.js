
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { colors, width, height } from '../../assets/globalStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InputTextBox from '../../components/InputTextBox';
import BasicButton from '../../components/BasicButton';
import { AuthContext } from '../../../AuthProvider';


export default function ChangePasswordScreen() {

  const {changePassword } = useContext(AuthContext);

  const [inputPw, setInputPw] = useState('');
  const [inputNewPw, setInputNewPw] = useState('');

  const [pwTextColor, setPwTextColor] = useState(colors.textGray);
  const [newPwTextColor, setNewPwTextColor] = useState(colors.textGray);
  const [pwCheckTextColor, setPwCheckTextColor] = useState(colors.textGray);
  const [buttonColor, setButtonColor] = useState(colors.gray);
  const [buttonAble, setBttonAble] = useState(true);

  useEffect(() => {
    if ( pwTextColor == colors.highlightBlue && pwCheckTextColor == colors.highlightBlue && newPwTextColor == colors.highlightBlue ) {
      setButtonColor(colors.loginBlue);
      setBttonAble(false);
    }
    else {
      setButtonColor(colors.gray);
      setBttonAble(true);
    }
  })

  function ChangeProcess(){
    Alert.alert(
      '변경하시겠습니까?',
      '',
      [
          { text: '확인', onPress: async () => {
            changePassword(inputPw, inputNewPw)

        }},{ text : '취소'}
      ],
    );
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
  //New pw 조건 Check part
  const handleNewPwValue = (text) => {
    setInputNewPw(text);
    if (is_pw(text)) {
      setNewPwTextColor(colors.highlightBlue);
    }
    else if (!is_pw(text)) {
      setNewPwTextColor(colors.highlightRed);
    }
  }

  //pwCheck 조건 Check part
  const handlePwCheckValue = (text) => {
    if (inputNewPw == text) {
      setPwCheckTextColor(colors.highlightBlue);
    }
    else if (!(inputNewPw == text)) {
      setPwCheckTextColor(colors.highlightRed);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{paddingTop: height* 200}} showsVerticalScrollIndicator={false}>
      <View style={styles.inputArea}>
        <InputTextBox title={'기존 비밀번호'} value={'inputPw'} onChangeText={handlePwValue} type={'password'} />
        <Text style={{ color: pwTextColor, fontSize: width * 13 }}>• 기존 비밀번호를 입력해주세요</Text>
        <InputTextBox title={'새 비밀번호'} value={'inputNewPw'} onChangeText={handleNewPwValue} type={'password'} />
        <Text style={{ color: newPwTextColor, fontSize: width * 13 }}>• 비밀번호를 입력해주세요{'\n'}(영문+숫자+특수기호, 8글자 이상, 20글자 이하)</Text>
        <InputTextBox title={'새 비밀번호 확인'} value={'inputPwCheck'} onChangeText={handlePwCheckValue} type={'password'} />
        <Text style={{ color: pwCheckTextColor, fontSize: width * 13 }}>• 입력하신 비밀번호를 다시 입력해주세요)</Text>

      </View>
      <View style={styles.buttonArea}>
        <BasicButton color={buttonColor} size={100} title={"변경"} able={buttonAble} onPress={ChangeProcess}/>
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
    width: width * 300,
    height: height * 250,
    marginBottom: height * 10,
  },
  buttonArea: {
    width: width * 300,
    height: height * 60,
    // marginTop: height * 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:height*200,
  },
});
