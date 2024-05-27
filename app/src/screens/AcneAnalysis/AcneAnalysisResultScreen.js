import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors, width, height, styleG } from '../../assets/globalStyles'; //width,height 받아오기
import BasicButton from '../../components/BasicButton'
import axios from 'axios';
import Acne from '../../assets/Acne.json';
import { AuthContext } from '../../../AuthProvider';
import Subseperator from '../../components/Subseperator'
import { Shadow } from 'react-native-shadow-2';


export default function AcneAnalysisResultScreen({ route }) {

  const navigation = useNavigation();

  const { userId } = useContext(AuthContext)

  const [imageData, setImageData] = useState(null);
  const [acneType, setAcneType] = useState('');
  const [careContents, setCareContents] = useState('');
  const [avoidContents, setAvoidContents] = useState('');

  const [loading, setLoading] = useState(true);

  const deleteResultUrl = "http://52.79.237.164:3000/user/skin/record/delete"

  const { recordId, acneLevel, history, takeDay, photo } = route.params;


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
    console.log('기록번호:', recordId)
    setImageData(photo);
    console.log('여드름 분류 레벨:', acneLevel)
    setContents()
    setLoading(false)
  }, [])


  const setContents = () => {
    if (acneLevel == 1) {
      setAcneType(Acne[1]["종류"])
      setCareContents(Acne[1]["관리법"])
      setAvoidContents(Acne[1]["피해야 할 사항"])
    }
    else if (acneLevel == 2) {
      setAcneType(Acne[2]["종류"])
      setCareContents(Acne[2]["관리법"])
      setAvoidContents(Acne[2]["피해야 할 사항"])
    }

    else if (acneLevel == 3) {
      setAcneType(Acne[3]["종류"])
      setCareContents(Acne[3]["관리법"])
      setAvoidContents(Acne[3]["피해야 할 사항"])
    }
  }
  const goDelete = async () => {
    Alert.alert(
      '삭제',
      '삭제시 다시 열람하실 수 없습니다.',
      [
        {
          text: '확인', onPress: async () => {
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
                      {
                        text: '확인', onPress: async () => {
                          navigation.goBack();
                        }
                      },
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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>로딩 중...</Text>
      </View>
    );
  }

  if (acneLevel == 0) {
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
            {history ? <View style={styles.historyArea}><Text style={{ fontSize: width * 27, color: 'gray', width: width * 400, fontFamily: 'NanumSquareRoundEB', marginBottom: height * 10 }}>[{takeDay}]Ai 트러블 분석</Text><Subseperator /></View> : <View style={{ height: height * 50, width: width * 300 }}></View>}
            <View style={styles.CleanContentsArea}>
              <View style={styles.TopArea}>
                <View style={styles.titleArea}>
                  <Text style={[styleG.textBold, { marginBottom: height * 20, fontSize: width * 25 }]}>분석 결과</Text>
                  <Text style={{ color: 'gray', fontSize: width * 20, }}><Text style={[styleG.textBold, { fontSize: width * 15, color: 'black' }]}>여드름이 발견되지 않았어요!</Text></Text>
                </View>
                {imageData && <Image source={{ uri: `data:image/jpeg;base64,${imageData}` }} style={styles.image} />}
              </View>
              <View style={{ padding: width * 13, height: height * 190, width: width * 360, borderColor: 'gray', borderWidth: 1, borderRadius: 10 }}>
                <ScrollView>
                  <View>
                    <Text style={[styleG.textBold, { color: colors.highlightBlue, fontSize: width * 20 }]}>관리법</Text>
                    <Text style={[styleG.textStyle, { fontSize: width * 15 }]}>잘하고 있어요! 지금의 컨디션을 유지하면 좋을 것 같아요</Text>
                  </View>
                  <View >
                    <Text style={[styleG.textBold, { color: colors.highlightRed, fontSize: width * 20, marginTop: height * 20 }]}>피해야 될 사항</Text>
                    <Text style={[styleG.textStyle, { fontSize: width * 15 }]}>급격한 환경변화와 평소 쓰지 않는 화장품을 조심해야돼요</Text>
                  </View>
                </ScrollView>
              </View>
            </View>
          {userId!='customer'?
            <View style={styles.CleanButtonArea}>
              <BasicButton category={'sideMargin'} color={colors.buttonSkyBlue} onPress={goDelete} title={'결과 삭제하기'} />
              <BasicButton category={'sideMargin'} color={colors.buttonSkyBlue} onPress={goDermatology} title={'주변 피부과'} />
            </View>
            :
            <View style={styles.CleanButtonArea}>
              <BasicButton category={'sideMargin'} color={colors.buttonSkyBlue} onPress={goDermatology} title={'주변 피부과'} />
            </View>
          }

          </View>
        </Shadow>
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
          <View style={styles.ContentsArea}>
            {history ? <View style={styles.historyArea}><Text style={{ fontSize: width * 27, color: 'gray', width: width * 4000, fontFamily: 'NanumSquareRoundEB', marginBottom: height * 10 }}>[{takeDay}]Ai 트러블 분석</Text><Subseperator /></View> : <View style={{ height: height * 82, width: width * 300 }}></View>}
            <View style={styles.TopArea}>
              <View style={styles.titleArea}>
                <Text style={[styleG.textBold, { marginBottom: height * 20, fontSize: width * 20 }]}>분석 결과</Text>
                <Text style={{ color: 'gray', fontSize: width * 18, }}><Text style={[styleG.textBold, { fontSize: width * 25, color: 'black' }]}>{acneType}</Text>입니다</Text>
              </View>
              {imageData && <Image source={{ uri: `data:image/jpeg;base64,${imageData}` }} style={styles.image} />}
            </View>
            <View style={{ padding: width * 13, height: height * 250, width: width * 380, borderColor: 'gray', borderWidth: 1, borderRadius: 10 }}>
              <ScrollView>
                <View>
                  <Text style={[styleG.textBold, { color: colors.highlightBlue, fontSize: width * 18 }]}>관리법</Text>
                  <Text style={[styleG.textStyle, { fontSize: width * 13 }]}>{careContents}</Text>
                </View>
                <View>
                  <Text style={[styleG.textBold, { color: colors.highlightRed, fontSize: width * 18, marginTop: height * 20 }]}>피해야 될 사항</Text>
                  <Text style={[styleG.textStyle, { fontSize: width * 13 }]}>{avoidContents}</Text>
                </View>
              </ScrollView>
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
  TopArea: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: height * 200,
    width: width * 380,
    marginTop: 30 * height,
    marginRight: 30 * width,
    paddingLeft: width * 15,

  },
  titleArea: {
    flex: 1,
    justifyContent: 'center',
  },
  ContentsArea: {
    flexDirection: 'column',
    height: height * 550,
    alignItems: 'center',
  },
  CleanContentsArea: {
    flexDirection: 'column',
    height: height * 500,
    alignItems: 'center',
  },
  ButtonArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: height * 80,
    marginRight: width * 20

  },
  subseperatorArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subseperator: {
    backgroundColor: 'grey',
    width: width * 400,
    height: 1,

  },
  image: {
    width: width * 150,
    height: height * 150,
  },
  historyArea: {
    width: width * 380,
    alignItems: 'flex-start',
    marginBottom: width * 10,
    marginTop: height * 30,

  },
  CleanButtonArea:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: height * 30,
    marginRight: width * 20,

  }


});
