
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors, width, height, styleG } from '../../assets/globalStyles';
import BasicButton from '../../components/BasicButton'
import Subseperator from '../../components/Subseperator'
import * as ImagePicker from 'expo-image-picker'
import { AuthContext } from '../../../AuthProvider';
import axios from 'axios';
import { Shadow } from 'react-native-shadow-2';

export default function AcneAnalysisScreen() {


  const AiTroubleUrl = 'http://ceprj.gachon.ac.kr:60017/classification_pred';
  


  const { userId } = useContext(AuthContext);
  const [loading, setLoading] =useState(false)


  useFocusEffect( //탭 활성화 인식
    React.useCallback(() => {
      // 탭이 활성화될 때 실행되는 함수
      setLoading(false)

      // 탭이 비활성화될 때 실행되는 함수
      return () => {
      };
    }, [])
  );

  useEffect(()=>{

  },[image])


  const [image,setImage]=useState('')


  const navigation = useNavigation();

  const handleImageCameraPress=async()=>{
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.All,
        allowsEditing:true,
        aspect:[1,1],
        quality:1
    })
    if(!result.canceled){
      setImage(result.assets[0].uri)
      console.log('콘솔',result.assets[0].uri)
      sendImageToServer(result.assets[0].uri); // 사진을 서버로 전송
    }
}
  const handleImagePickerPress=async()=>{
        // 카메라 롤(갤러리) 권한 요청
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
          console.log('Camera or media library permission denied');
          return;
        }
    
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.All,
        allowsEditing:true,
        aspect:[1,1],
        quality:1
    })
    if(!result.canceled){
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

    console.log('image:',formData._parts[0])
    console.log('formData:',formData)
    axios.post(AiTroubleUrl, formData, {
      //headers 설정해줘야 안드로이드 사진 업로드 가능
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
          // console.log("response:",response.data)
          const recordId=response.data.data.recordId
          const acneLevel=response.data.data.troubleType
          const photo=response.data.data.photo
          console.log('recordId',recordId,' acneLevel',acneLevel)
          setLoading[false]
          // console.log('폼데이터!',formData)
          navigation.navigate("AiTroubleResultScreen",{recordId:recordId, acneLevel:acneLevel, photo:photo})
      })
      .catch(error => {
        console.log(formData)
        console.error('Error:', error);
      });

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
        <Text style={styleG.titleText}>Ai 트러블 유형 </Text>
      </View>
      <View style={styles.contentsArea}>
        <Subseperator/>
        <View style={styles.commentArea}>
          <Text style={[styleG.textStyle, { fontSize: width * 22, paddingTop: height* 10 }]}>
            얼굴에 <Text style={styleG.textBold}>트러블</Text>이 생겼나요?
          </Text>
          <Text style={[styleG.textStyle, { fontSize: width * 16 }]}>
            {'\n'}
            여드름은 잘못 방치하거나 압출하면{'\n'}
            염증이 심해지고 흉터가 남기도 합니다.{'\n'}
            이를 해결하기 위해선 올바른 관리가 중요한데요.{'\n'}
            {'\n'}
            여드름도  <Text style={styleG.textBold}>종류가 다양</Text>하고 각각마다 <Text style={styleG.textBold}>관리법이{'\n'}
              다르다</Text>는 사실 알고 계셨나요?
            {'\n'}{'\n'}
            저희가 <Text style={styleG.textBold}>피부 진단 AI</Text>를 통해 어떤 유형의 여드름인지{'\n'}
            확인하고 적절한 대처법을 알려드립니다.{'\n'}
            편하고 빠르게 진단 후 관리법을 처방받아 보세요!
          </Text>
          <Text style={[styleG.textStyle, { fontSize: width * 16, marginTop: height * 30 }]}>
            이렇게 찍어주세요 :){'\n'}
            {'\t'}• <Text style={{color:colors.highlightBlue}}>화장하지 않은</Text> 맨 얼굴{'\n'}
            {'\t'}• <Text style={{color:colors.highlightBlue}}>선명하게</Text> 찍은 얼굴{'\n'}
            {'\t'}• <Text style={{color:colors.highlightBlue}}>트러블이 있는 부위</Text>의 얼굴{'\n'}
            {'\n'}
            이렇게 찍으면 어려워요 :({'\n'}
            {'\t'}• <Text style={{color:colors.highlightRed}}>초점이 맞지 않는</Text> 얼굴{'\n'}
            {'\t'}• <Text style={{color:colors.highlightRed}}>너무 먼 거리에서</Text> 찍은 얼굴{'\n'}
            {'\t'}• <Text style={{color:colors.highlightRed}}>얼굴 일부만</Text> 찍은 얼굴{'\n'}
            {'\t'}• <Text style={{color:colors.highlightRed}}>흔들리게</Text> 찍힌 얼굴{'\n'}
          </Text>
        </View>
      </View>
      <View style={styles.ButtonArea}>
        <BasicButton category={'sideMargin'} color={colors.buttonBlue} onPress={handleImageCameraPress} title={'사진 촬영'} />
        <BasicButton category={'sideMargin'} color={colors.buttonSkyBlue} onPress={handleImagePickerPress} title={'앨범에서 선택'} />
      </View>
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
