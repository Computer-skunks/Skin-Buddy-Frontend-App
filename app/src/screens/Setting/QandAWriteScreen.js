
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, width, height } from '../../assets/globalStyles';
import Subseperator from '../../components/Subseperator'
import BasicButton from '../../components/BasicButton';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../AuthProvider';
import axios from 'axios';



export default function QandAWriteScreen() {

  const navigation = useNavigation();

  const [inputVal, setInputVal] = useState('')

  const [buttonColor, setButtonColor] = useState(colors.gray);
  const [buttonAble, setBttonAble] = useState(true);
  const [loading, setLoading] = useState(false)

  const { userId } = useContext(AuthContext);

  const writeUrl = 'http://52.79.237.164:3000/user/question/create';

  useEffect(() => {
    if (inputVal.length > 10) {
      setButtonColor(colors.loginBlue);
      setBttonAble(false);
    }
    else {
      setButtonColor(colors.gray);
      setBttonAble(true);
    }
  }, [inputVal])

  if (loading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>로딩 중...</Text>
        </View>
    );
}

  function handleContentsValue(text) {
    setInputVal(text)

  }
  const uploadProcess = async() => {

    const postData = {
      "userId": userId,
      "question": inputVal
    };
    console.log(postData)
    setLoading(true)
    await axios.post(writeUrl, postData )
    .then(response => {
      // 요청 성공 시 처리
      console.log(response.data)
      console.log(postData)
      if (response.data['property'] == 200) {
        Alert.alert(
          response.data['message'],
          '',
          [
            { text: '확인' },
          ],
          );
          setLoading(false)
          navigation.goBack()
        }
        else if (response.data['property'] == 301) {
          console.log(response.data)
          Alert.alert(
            response.data['message'],
            '',
            [
              { text: '확인' },
            ],
          );
        }
      })
      .catch(error => {
        // 요청 실패 시 처리
        console.log(error)
      })
  }

  function uploadQA() {

    Alert.alert(
      'Q&A 등록',
      '한 번 등록시 수정 및 삭제가 불가능합니다. 등록하시겠습니까?',
      [
        {
          text: '확인', onPress: () => {
            uploadProcess()
          }
        }, { text: '취소' }
      ],
    )

  }

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={{ fontSize: width * 35, color: 'gray', width: width * 270, fontFamily: 'NanumSquareRoundEB' }}>Q&A 작성</Text>
      </View>
      <Subseperator />
      <View style={styles.inputArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TextInput
          style={styles.textBox}
          autoCapitalize='none'
          onChangeText={handleContentsValue}
          value={inputVal}
          multiline={true} // 여러 줄 입력 가능하도록 설정
          placeholder={'10자 이상 입력해주세요'}
          fontSize={width * 20}
        />

        </KeyboardAvoidingView>
      </View>
      <View style={styles.buttonArea}>
        <BasicButton category={'sideMargin'} color={colors.highlightBlue} size={100} title={"취소"} onPress={() => { navigation.goBack() }} />
        <BasicButton category={'sideMargin'} color={buttonColor} size={100} title={"등록"} onPress={() => { uploadQA() }} able={buttonAble} />
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
    paddingBottom: 20
  },
  titleArea: {
    width: width * 400,
    alignItems: 'flex-start',
    marginBottom: width * 10
  },
  textBox: {
    height: height * 300,
    width: width * 400,
    textAlignVertical: 'top', // 텍스트 상단에 맞추어 출력
    backgroundColor: colors.softGray,
    marginTop: height *100,
  },
  inputArea: {
    height: height * 470,
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: height * 50,
    width: width * 400,
    paddingTop: height * 40,

  }

});
