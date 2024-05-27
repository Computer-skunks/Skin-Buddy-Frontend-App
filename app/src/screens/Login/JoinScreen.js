
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputTextBox from '../../components/InputTextBox';
import { colors, width, height } from '../../assets/globalStyles'
import BasicButton from '../../components/BasicButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';


export default function JoinScreen() {
  const navigation = useNavigation();
  const joinApiUrl = 'http://52.79.237.164:3000/user/create';


  // 입력 필드의 값을 추적하기 위해 useState 훅을 사용.
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [inputNickname, setInputNickname] = useState('');
  const [inputTel, setInputTel] = useState('');

  const [idTextColor, setIdTextColor] = useState(colors.textGray);
  const [pwTextColor, setPwTextColor] = useState(colors.textGray);
  const [pwCheckTextColor, setPwCheckTextColor] = useState(colors.textGray);
  const [nicknameTextColor, setNicknameTextColor] = useState(colors.textGray);
  const [telTextColor, setTelTextColor] = useState(colors.textGray);

  const [buttonColor, setButtonColor] = useState(colors.gray);
  const [buttonAble, setBttonAble] = useState(true);

  useEffect(() => {
    if (idTextColor == colors.highlightBlue && pwTextColor == colors.highlightBlue && pwCheckTextColor == colors.highlightBlue && nicknameTextColor == colors.highlightBlue && telTextColor == colors.highlightBlue) {
      setButtonColor(colors.loginBlue);
      setBttonAble(false);
    }
    else {
      setButtonColor(colors.gray);
      setBttonAble(true);
    }

  }, [idTextColor, pwTextColor, telTextColor, pwCheckTextColor, nicknameTextColor, telTextColor])

  function is_id(asValue) {
    var regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,19}$/;
    return regExp.test(asValue);
  }
  function is_pw(asValue) {
    var regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!?()$#^*~%&@])[a-zA-Z][a-zA-Z0-9!?()$#^*~%&@]{7,19}$/;
    return regExp.test(asValue);
  }
  function is_nickname(asValue) {
    var regExp = /^.{1,8}$/;
    return regExp.test(asValue)
  }
  function is_tel(asValue) {
    //전화번호 길이 바꾸기
    var regExp = /^010\d{8}$/;
    return regExp.test(asValue);
  }

  //id 조건 Check part
  //입력 필드의 값이 변경되었을 때 호출되는 핸들러 함수
  const handleIdValue = (text) => {
    setInputId(text);
    if (is_id(text)) {
      setIdTextColor(colors.highlightBlue);
    }
    else if (!is_id(text)) {
      setIdTextColor(colors.highlightRed);
    }
  };

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

  //pwCheck 조건 Check part
  const handlePwCheckValue = (text) => {
    if (inputPw == text) {
      setPwCheckTextColor(colors.highlightBlue);
    }
    else if (!(inputPw == text)) {
      setPwCheckTextColor(colors.highlightRed);
    }
  }

  //nickname 조건 Check part
  const handleNicknameValue = (text) => {
    setInputNickname(text);
    if (is_nickname(text)) {
      setNicknameTextColor(colors.highlightBlue);
    }
    else if (!is_nickname(text)) {
      setNicknameTextColor(colors.highlightRed);
    }
  }

  //tel 조건 Check part
  const handleTelValue = (text) => {
    setInputTel(text);
    if (is_tel(text)) {
      setTelTextColor(colors.highlightBlue);
    }
    else if (!is_tel(text)) {
      setTelTextColor(colors.highlightRed);
    }
  }

  const goJoin = () => {

    const postData = {
      "userId": inputId,
      "psword": inputPw,
      "nickname": inputNickname,
      "tel": inputTel
    };

    axios.post(joinApiUrl, postData)
      .then(response => {
        // 요청 성공 시 처리
        console.log('Data:', response.data);
        if (response.data['property'] == 200) {
          Alert.alert(
            response.data['message'],
            '',
            [
              { text: '확인' },
            ],
            { cancelable: false } // 경고 창을 취소할 수 없는 경우 설정합니다.
          );
          navigation.navigate('Login');
        }
        else if (response.data['property'] == 302) {
          Alert.alert(
            response.data['message'],
            '',
            [
              { text: '확인' },
            ],
            { cancelable: false } // 경고 창을 취소할 수 없는 경우 설정합니다.
          );
        }
      })
      .catch(error => {
        // 요청 실패 시 처리
        console.error('Error:', error);
      });
  }
  return (

    <View style={styles.container}>
      {/* inputText 눌렀을 경우 키보드 올라가게 하기 */}
      <KeyboardAwareScrollView style={{ height: height * 100 }}>
        <View style={styles.contentsArea}>
          <View style={styles.logoArea}>
            <Image style={styles.logo} source={require("../../assets/img/SkinBuddy_logo.png")}></Image>
          </View>
          <View style={{ height: height * 425 }}>
            <View style={styles.inputArea}>
              <InputTextBox title={'ID'} value={'inputId'} onChangeText={handleIdValue} />
              <Text style={{ color: idTextColor, fontSize: width * 13 }}>• 아이디를 입력해주세요{'\n'}(영문+숫자, 6글자 이상, 20글자 이하)</Text>
              <InputTextBox title={'PW'} value={'inputPw'} onChangeText={handlePwValue} type={'password'} />
              <Text style={{ color: pwTextColor, fontSize: width * 13 }}>• 비밀번호를 입력해주세요{'\n'}(영문+숫자+특수기호, 8글자 이상, 20글자 이하)</Text>
              <InputTextBox title={'PW Check'} value={'inputPwCheck'} onChangeText={handlePwCheckValue} type={'password'} />
              <Text style={{ color: pwCheckTextColor, fontSize: width * 13 }}>• 입력하신 비밀번호를 다시 입력해주세요)</Text>
              <InputTextBox title={'Nickname'} value={'inputNickname'} onChangeText={handleNicknameValue} />
              <Text style={{ color: nicknameTextColor, fontSize: width * 13 }}>• 사용하실 닉네임을 입력해주세요 (20글자 이하)</Text>
              <InputTextBox title={'Tel'} value={'inputTel'} onChangeText={handleTelValue} />
              <Text style={{ color: telTextColor, fontSize: width * 13 }} >• 본인 전화번호의 숫자만 입력해주세요</Text>
            </View>
          </View>
          <View style={styles.buttonArea}>
            <BasicButton category={'SideMargin'} color={buttonColor} size={300} title={"회원가입"} onPress={goJoin} able={buttonAble} />
          </View>
        </View>
      </KeyboardAwareScrollView >
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
  logoArea: {
    width: width * 400,
    height: 130,
    marginTop: height * 40,
    alignItems: 'center',
  },
  logo: {
    height: height * 150,
    width: width * 150,
  },
  inputArea: {
    width: width * 300,
    height: height * 160,
  },
  buttonArea: {
    width: width * 300,
    height: height * 60,
    marginTop: height * 10,
  },

});
