
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors, width, height, styleG } from '../../assets/globalStyles'; //width,height 받아오기
import BasicButton from '../../components/BasicButton'
import axios from 'axios';
import Subseperator from '../../components/Subseperator'
import { Shadow } from 'react-native-shadow-2';


export default function ImprovementAnalysisResultScreen({ route }) {

  const { recordId, troubleTotal, pastData, pastTotal, improvement, history, takeDay, currentPhoto, pastPhoto } = route.params;

  const [currentImageData, setCurrentImageData] = useState('');
  const [pastImageData, setPastImageData] = useState('');

  const deleteResultUrl = "http://52.79.237.164:3000/user/skin/record/delete"

  const [pastTotalValue,setPastTotalValue]= useState(0)
  const [comment, setComment] = useState('')

  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  console.log(pastTotal)
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

  useEffect(() => {
    console.log('recordId:', recordId, ' truoubleTotal:', troubleTotal, 'pastData:', pastData, 'improvement:', improvement, 'pastTotal:', pastTotal )
  
    setCurrentImageData(currentPhoto);
    setPastImageData(pastPhoto);
    setPastTotalValue(pastTotal!=undefined? pastTotal : null)
    setComment(improvement)
    setLoading(false)
  
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>로딩 중...</Text>
      </View>
    );
  }


  function returnImage() {

    console.log(recordId, pastData)
    const postData = {
      "recordId": recordId,
      "pastRecordId": (pastData == "" ? null : pastData)
    }
    console.log(postData)
    axios.post(returnPhotoUrl, postData)
      .then(response => {
        setImageData(response.data);
      })
      .catch(error => {
        console.log('recordId:', recordId)
        console.error('에러 발생:', error);
      });
  }


  const goDelete = async () => {

    Alert.alert(
      '삭제',
      '삭제시 다시 열람하실 수 없습니다.',
      [
          {
              text: '확인', onPress:  async() => {                
                    const deleteData = {
                      "recordId": recordId,
                    };
                    await axios.delete(deleteResultUrl, { data: deleteData })
                      .then(response => {
                        // 요청 성공 시 처리
                        console.log(response.data)
                        console.log(deleteData)
                        if (response.data['property'] == 200) {

                          console.log('진단기록 삭제됨')
                          Alert.alert(
                            '삭제되었습니다',
                            '',
                            [
                              { text: '확인', onPress:async()=>{
                                navigation.goBack();
                              } },
                            ],
                          );
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
                        else {
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
            }, { text: '취소' }
      ]
  );
  }

  const goDermatology = () => {
    navigation.navigate('DermatologyMapScreen');
  }

  if (pastData) {

    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Shadow
          viewStyle={{
            width: width * 400,
            height: height * 650, marginTop: height * 20,
          }} // 스타일을 설정하면 됩니다.
          radius={10} // 그림자 radius
          offset={[5, 20]} // 그림자 위치 (x, y)
          startColor="#dde0ea" // 그림자 색상
        >
          <View style={styles.container}>
            {history && <View style={styles.historyArea}><Text style={{ fontSize: width * 27, color: 'gray', width: width * 4000, fontFamily: 'NanumSquareRoundEB', marginBottom: height * 10 }}>[{takeDay}]Ai 호전도 분석</Text><Subseperator /></View>}
            <View style={styles.resultArea}>
              <View style={styles.titleArea}>
                <Text style={[styleG.titleText, { color: colors.textGray, fontSize: width * 30 }]}>분석 결과</Text>
              </View>
              <View style={styles.contentsArea}>
                <View style={[styles.imgArea, { marginTop: height * 10, }]}>
                  <View style={styles.beforeArea}>
                    <Image source={{ uri: `data:image/jpeg;base64,${pastImageData}` }} style={styles.image} />
                    <View style={[styles.beforeAfterBlock, { backgroundColor: 'white' }]}>
                      <Text style={styleG.textStyle}>전</Text>
                      <Text style={[styleG.textStyle, { fontSize: width * 17 }]}>{pastTotalValue}개</Text>
                    </View>
                  </View>
                  <View style={styles.middleArea}>
                    <Text style={{ fontSize: width * 20 }}> {'→'} </Text> 
                  </View>

                  <View style={styles.afterArea}>
                    <Image source={{ uri: `data:image/jpeg;base64,${currentImageData}` }} style={styles.image} />
                    {pastTotal - troubleTotal > 0 ?
                      (<View style={[styles.beforeAfterBlock, { backgroundColor: 'white' }]}>
                        <Text style={styleG.textStyle}>후</Text>
                        <Text style={[styleG.textStyle, { fontSize: width * 17 }]}>{troubleTotal}개</Text>
                      </View>
                      )
                      :
                      (<View style={[styles.beforeAfterBlock, { backgroundColor: 'white' }]}>
                        <Text style={styleG.textStyle}>후</Text>
                        <Text style={[styleG.textStyle, { fontSize: width * 17 }]}>{troubleTotal}개</Text>
                      </View>
                      )
                    }
                  </View>
                </View>
                <View style={styles.textArea}>
                  <Text style={[styleG.textStyle, { fontSize: width * 15 ,height:height*30,}]}>{comment}</Text>
                </View>
              </View>
              <Subseperator type={"thin"} />
            </View>
            <View style={styles.ButtonArea}>
              <BasicButton category={'sideMargin'} color={colors.buttonSkyBlue} onPress={goDelete} title={'결과 삭제하기'} />
              <BasicButton category={'sideMargin'} color={colors.buttonSkyBlue} onPress={goDermatology} title={'주변 피부과'} />
            </View>
          </View>
        </Shadow>
      </View>
    );
  }
  else {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Shadow
          viewStyle={{
            width: width * 400,
            height: height * 650, marginTop: height * 20,
          }} // 스타일을 설정하면 됩니다.
          radius={10} // 그림자 radius
          offset={[5, 20]} // 그림자 위치 (x, y)
          startColor="#dde0ea" // 그림자 색상
        >
      <View style={styles.container}>
        {history && <View style={styles.historyArea}><Text style={{ fontSize: width * 27, color: 'gray', width: width * 4000, fontFamily: 'NanumSquareRoundEB', marginBottom: height * 10 }}>[{takeDay}]Ai 호전도 분석</Text><Subseperator /></View>}
        <View style={styles.resultArea}>
          <View style={styles.titleArea}>
            <Text style={[styleG.titleText, { color: colors.textGray }]}>분석 결과</Text>
          </View>
          <View style={styles.contentsArea}>
            <View style={styles.imgArea}>
              {currentImageData != [] ? (
                <Image source={{ uri: `data:image/jpeg;base64,${currentImageData}` }} style={styles.image} />
              ) : (
                <Image source={require('../../assets/img/Mbti.png')} style={styles.image} />
              )}
            </View>
            <View style={styles.textArea}>
              <Text style={[styleG.textStyle, { fontSize: width * 20 }]}>{troubleTotal}개의 트러블 발견!</Text><Text style={[styleG.textStyle, { fontSize: width * 15 }]}> 결과를 등록했습니다. 다음에 호전도 분석 사진을 등록하시면 결과를 알려드릴게요!</Text>
            </View>
          </View>
        </View>
        <View style={styles.ButtonArea}>
          <BasicButton category={'sideMargin'} color={colors.buttonSkyBlue} onPress={goDelete} title={'결과 삭제하기'} />
          <BasicButton category={'sideMargin'} color={colors.buttonSkyBlue} onPress={goDermatology} title={'주변 피부과'} />
        </View>
      </View>
      </Shadow>
      </View>
    );
  }
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
    width: width* 400,
    height: height * 70,
    alignItems: 'center'
  },
  contentsArea: {
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
    height: height * 380,
    // backgroundColor: 'red',
  },
  ButtonArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: height * 70,
    marginRight: width * 20,
    // backgroundColor: 'blue',
  },

  resultArea: {
    height: height * 500,
    alignItems:'center'
    // backgroundColor: 'yellow',
  },
  imgArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 400,

  },
  image: {
    // margin: width * 10,
    width: width * 160,
    height: height * 160,
    borderRadius: 15,
    // borderTopEndRadius: 10,
  },
  textArea: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 30,
    width: width * 400,
    // borderWidth:1,
    // borderColor:colors.darkGray
  },
  historyArea: {
    width: width * 450,
    alignItems: 'flex-start',
    marginBottom: width * 10,
    marginLeft: width * 20,
    marginTop: height * 30
  },
  middleArea: {
    height: height * 250,
    width: width * 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
    flexDirection: 'row',
    marginBottom: height * 30,
    marginTop: height * 30,
  },
  beforeArea: {
    flexDirection: 'column',
    width: width * 200,
    height: height * 300,
    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor:'green'
  }, afterArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 200,
    height: height * 300,
    // backgroundColor:'green'
  },
  beforeAfterBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 100,
    height: height * 50,
    borderRadius: 15,
    // borderBottomEndRadius: 15,
    marginTop: height * 20,
    borderWidth: 1,
    // borderColor: 

  },


});
