import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import MbtiGraph from '../components/MbtiGraph';
import AdBanner from '../components/AdBanner';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styleG, colors, width, height } from '../assets/globalStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../AuthProvider';
import { Shadow } from 'react-native-shadow-2';
import mbtiData from '../assets/mbtiResult.json';

export default function MainScreen() {
  const navigation = useNavigation();
  
  const { userId, setLoading, userName, loading, skinType, doScore, rsScore, pnScore, wtScore } = useContext(AuthContext);

  const [backColor, setBackColor] = useState('#9EC0E7');
  const [userMbti, setUserMbti] = useState(skinType);
  const [doResult, setDoResult] = useState(0);
  const [rsResult, setRsResult] = useState(0);
  const [pnResult, setPnResult] = useState(0);
  const [wtResult, setWtResult] = useState(0);
  const [doType, setDoType] = useState('');
  const [rsType, setRsType] = useState('');
  const [pnType, setPnType] = useState('');
  const [wtType, setWtType] = useState('');
  
  useFocusEffect( //탭 활성화 인식
  React.useCallback(() => {
    // 탭이 활성화될 때 실행되는 함수
    
    // 탭이 비활성화될 때 실행되는 함수
    return () => {
      
    };
  }, [])
  );
  
  useEffect(() => {
    setLoading(true);

    setUserMbti(skinType);
    setDoResult(doScore);
    setRsResult(rsScore);
    setPnResult(pnScore);
    setWtResult(wtScore);

    console.log('skinType:',skinType,' doScore:',doScore,'rsScore',rsScore,'pnScore',pnScore,'wtScore',wtScore);

    ScoreCalcDO();
    ScoreCalcRS();
    ScoreCalcPN();
    ScoreCalcWT();

    mbtiColor();

    console.log(skinType);
    setBackColor(mbtiData[skinType].color);

    setLoading(false);
  }, [skinType, doScore, rsScore, pnScore, wtScore]); // 의존성 배열에 모든 상태 추가

  useEffect(() => {
  
  }, [doResult, rsResult, pnResult, wtResult]);

  const mbtiColor = () => {
    // ...
  };

  const ScoreCalcDO = () => {
    const doResult = doScore;
    console.log('doResult:', doResult);
    if (doResult > 26) {
      setDoResult(doResult * 2.8);
      setDoType('Oily');
    } else {
      setDoResult(doResult * 2);
      setDoType('Dry');
    }
  };

  const ScoreCalcRS = () => {
    const rsResult = rsScore;
    console.log('rsResult:', rsResult);
    if (rsResult > 29) {
      setRsResult(rsResult * 1.7);
      setRsType('Sensitive');
    } else {
      if (rsResult > 24) {
        setRsResult(rsResult * 2);
      } else {
        setRsResult(rsResult);
      }
      setRsType('Resistent');
    }
  };

  const ScoreCalcPN = () => {
    const pnResult = pnScore;
    console.log('pnResult:', pnResult);
    if (pnResult > 30) {
      setPnResult(pnResult * 3);
      setPnType('Pigment');
    } else {
      setPnResult(pnResult * 2);
      setPnType('Non-Pigment');
    }
  };

  const ScoreCalcWT = () => {
    const wtResult = wtScore;
    console.log('wtResult:', wtResult);
    if (wtResult > 40) {
      if (wtResult <= 60) {
        setWtResult(wtResult * 1.8);
      } else if (wtResult < 75 && wtResult > 60) {
        setWtResult(wtResult * 1.6);
      } else {
        setWtResult(wtResult * 1.4);
      }
      setWtType('Wrinkle');
    } else {
      setWtResult(wtResult);
      setWtType('Tight');
    }
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
    <View style={styles.container}>
      <View style={styles.adBanner}>
        <AdBanner />
      </View>
      <View style={styles.bottom}>
        <View style={styles.userNameArea}>
          <Text>
            <Text style={[styleG.textBold, { fontSize: width * 30, color: colors.textGray }]}>
              {userName}
            </Text>
            <Text style={[styleG.textStyle, { fontSize: width * 23, color: colors.textGray, fontFamily: 'NanumSquareRoundB', fontWeight: '100' }]}>
              님의 피부 MBTI
            </Text>
          </Text>
        </View>
        <Shadow
          viewStyle={{
            width: width * 400,
            height: height * 650, marginTop: height * 20,
          }}
          radius={10}
          offset={[1, 3]}
          startColor="#E1E1E1"
        >
          <View style={styles.mbtiResult}>
            {userId !== 'customer' ? (
              <View style={{ width: width * 400, flexDirection: 'row' }}>
                <View style={styles.mbti}>
                  <TouchableOpacity style={[styles.mbtiBlock, { backgroundColor: backColor }]} onPress={() => { skinType === '????' ? navigation.navigate('MBTI') : navigation.navigate('MbtiTestResult') }}>
                    <Text style={styles.mbtiText}>{userMbti}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.graph}>
                  <MbtiGraph category={doType} score={doResult} />
                  <MbtiGraph category={rsType} score={rsResult} />
                  <MbtiGraph category={pnType} score={pnResult} />
                  <MbtiGraph category={wtType} score={wtResult} />
                </View>
              </View>
            ) : (
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={styles.img} source={require('../assets/img/customer_mbitGraph.png')} />
              </View>
            )}
          </View>
        </Shadow>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  mbtiResult: {
    width: width * 400,
    height: height * 270,
    flexDirection: 'row',
    backgroundColor: colors.softGray,
    borderColor: colors.darkGray,
    borderWidth: width * 0.5,
    borderRadius: 15,
  },
  mbti: {
    width: width * 180,
    alignItems: 'center',
    justifyContent: 'center'
  },
  graph: {
    width: width * 200,
    justifyContent: 'center',
  },
  mbtiBlock: {
    width: width * 120,
    height: height * 110,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mbtiText: {
    fontFamily: 'NanumSquareRoundB',
    fontSize: width * 30,
    color: 'white',
  },
  adBanner: {
    height: height * 280,
    marginBottom: height * 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: height * 50,
  },
  userNameArea: {
    height: width * 40,
    width: width * 400,
    paddingLeft: width * 10,
  },
  bottom: {
    marginBottom: height * 20
  },
  img:{
    width: width * 360,
    height: height * 240,
  }
});
