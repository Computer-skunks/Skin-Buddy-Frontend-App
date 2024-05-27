
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors, width, height, styleG } from '../../assets/globalStyles';
import BasicButton from '../../components/BasicButton'
import Subseperator from '../../components/Subseperator'
import * as ImagePicker from 'expo-image-picker'
import { AuthContext } from '../../../AuthProvider';
import axios from 'axios';
import { Shadow } from 'react-native-shadow-2';

export default function ImprovementAnalysisScreen() {

  const AiImprovementUrl = 'http://ceprj.gachon.ac.kr:60017/detection_pred';

  const { userId } = useContext(AuthContext);
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

  useFocusEffect( //탭 활성화 인식
    React.useCallback(() => {
      // 탭이 활성화될 때 실행되는 함수
      console.log('탭이 활성화되었습니다.');

      // 탭이 비활성화될 때 실행되는 함수
      return () => {
        console.log('탭이 비활성화되었습니다.');
        // 여기에 실행하고자 하는 특정 함수를 추가합니다.
      };
    }, [])
  );

  const navigation = useNavigation();

  const handleImagePickerPress = async () => {
    // 카메라 롤(갤러리) 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // 권한 확인
    if (status !== 'granted') {
      console.log('Camera roll permission denied');
      return;
    }


    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
      sendImageToServer(result.assets[0].uri); // 사진을 서버로 전송
    }
  }

  const handleImageCameraPress = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
      sendImageToServer(result.assets[0].uri); // 사진을 서버로 전송
    }
  }


  const sendImageToServer = async (imageUri) => {
    setLoading(true)

    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpeg',
    });
    formData.append('userId', userId);

    try {
      const response = await axios.post(AiImprovementUrl, formData, {
        //headers 설정해줘야 안드로이드 사진 업로드 가능
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("response:", response.data);

      const recordId = response.data.currentData.recordId ? response.data.currentData.recordId : null;
      const troubleTotal = response.data.currentData.troubleTotal;
      const improvement = response.data.improvement;
      const pastRecordId = response.data.improvement != "처음으로 호전도 검사 서비스를 사용 하였으므로 과거 기록이 존재하지 않습니다" ? response.data.pastData.recordId : null; // 직접 호출
      const pastPhoto = (response.data.pastData.photo != null) && (response.data.pastData.photo != undefined) ? response.data.pastData.photo : null; // 직접 호출
      setLoading(false);
      navigation.navigate("ImprovementAnalysisResultScreen", { recordId: recordId, troubleTotal: troubleTotal, pastData: pastRecordId, improvement: improvement, currentPhoto: response.data.currentData.photo, pastPhoto: response.data.pastData.photo, pastTotal: response.data.pastData.troubleTotal });
    } catch (error) {
      console.error('Error:', error);
    }

    setImage(null);
  };


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>로딩 중...</Text>
      </View>
    );
  }

  return (

    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Shadow
        viewStyle={{
          width: width * 400,
          height: height * 650, marginTop: height * 20,
        }} 
        radius={10} // 그림자 radius
        offset={[5, 20]} // 그림자 위치 (x, y)
        startColor="#dde0ea" // 그림자 색상
      >
        <View style={styles.container}>
          <View style={styles.titleArea}>
            <Text style={styleG.titleText}>Ai 피부 호전도 분석</Text>
          </View>
          <View style={styles.contentsArea}>
            <Subseperator />
            <View style={styles.commentArea}>
              <Text style={[styleG.textStyle, { fontSize: width * 22 }]}>
                과거 사진과 비교하여 <Text style={styleG.textBold}>호전도</Text>를 {'\n'}확인해보세요!
              </Text>
              <Text style={[styleG.textStyle, { fontSize: width * 16 }]}>
                {'\n'}
                관리의 완성은 꾸준함이죠! 아무리 좋은 방법일지라도
                지속적이지 않으면 아쉽게 얻고자 하는 바를 놓칠 수도
                있어요.{'\n'}
                {'\n'}
                저희가 <Text style={styleG.textBold}>피부 분석 AI</Text>하고 각각마다 <Text style={styleG.textBold}>관리법이{'\n'}
                  다르다</Text>는 사실 알고 계셨나요?
                {'\n'}{'\n'}
                저희가 <Text style={styleG.textBold}>피부 진단 AI</Text>를 통해 지난 사진과 비교해서{'\n'}
                얼마나 호전되었는지 파악해 드릴게요!
              </Text>
              <Text style={[styleG.textStyle, { fontSize: width * 16, marginTop: height * 30 }]}>
                이렇게 찍어주세요 :){'\n'}
                {'\t'}• <Text style={{ color: colors.highlightBlue }}>화장하지 않은</Text> 맨 얼굴{'\n'}
                {'\t'}• <Text style={{ color: colors.highlightBlue }}>선명하게</Text> 찍은 얼굴{'\n'}
                {'\t'}• <Text style={{ color: colors.highlightBlue }}>트러블이 있는 부위</Text>의 얼굴{'\n'}
                {'\n'}
                이렇게 찍으면 어려워요 :({'\n'}
                {'\t'}• <Text style={{ color: colors.highlightRed }}>초점이 맞지 않는</Text> 얼굴{'\n'}
                {'\t'}• <Text style={{ color: colors.highlightRed }}>너무 먼 거리에서</Text> 찍은 얼굴{'\n'}
                {'\t'}• <Text style={{ color: colors.highlightRed }}>옆모습이나 각도가 기운 채</Text>로 찍은 얼굴{'\n'}
                {'\t'}• <Text style={{ color: colors.highlightRed }}>흔들리게</Text> 찍힌 얼굴{'\n'}
              </Text>
            </View>
          </View>
          {userId != 'customer' ?

            <View style={styles.ButtonArea}>
              <BasicButton category={'sideMargin'} color={colors.buttonBlue} onPress={handleImageCameraPress} title={'사진 촬영'} />
              <BasicButton category={'sideMargin'} color={colors.buttonSkyBlue} onPress={handleImagePickerPress} title={'앨범에서 선택'} />
            </View>
            :
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <View style={{backgroundColor: colors.softGray, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: height * 55, width:width*300, borderRadius:10,borderWidth:0.3}}>
              <Text>로그인 후 이용 가능한 서비스 입니다</Text>
            </View>
            </View>
            }
        </View>
      </Shadow>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 400,
    height: height * 650,
    flexDirection: 'columm',
    justifyContent: 'center',
    paddingBottom: height * 20,
    backgroundColor: 'white',
    marginTop: height * 20,
    borderRadius: 10,
  },
  titleArea: {
    flexDirection: 'row',
    height: height * 70,
    width: width * 400,
    alignItems: 'flex-start',
  },
  commentArea: {
    flexDirection: 'columm',
    height: height * 500,
    width: width * 360,
    marginTop: height * 10,
    justifyContent: 'center',
  },
  ButtonArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 55,
  },
  contentsArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
