
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors, width, height, styleG } from '../../assets/globalStyles';
import BasicButton from '../../components/BasicButton'
import Subseperator from '../../components/Subseperator'
import { Shadow } from 'react-native-shadow-2';


export default function MbtiTestScreen() {

  useFocusEffect( //탭 활성화 인식
    React.useCallback(() => {
      // 탭이 활성화될 때 실행되는 함수
      console.log('MBTI탭이 활성화되었습니다.');

      // 탭이 비활성화될 때 실행되는 함수
      return () => {
        console.log('MBTI탭이 비활성화되었습니다.');
      };
    }, [])
  );


  const navigation = useNavigation();

    //설문지 이동
  const goPaper = () => {
    navigation.navigate('MbtiTest');
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
        <Text style={styleG.titleText}>피부 MBTI 유형 분석 </Text>
      </View>
      <View style={styles.contentsArea}>
        <Subseperator/>
        <View style={styles.commentArea}>
          <Text style={[styleG.textStyle, { fontSize: width * 22 }]}>
            당신의 <Text style={styleG.textBold}>피부 타입</Text>을 분석해드릴게요!
          </Text>
          <Text style={[styleG.textStyle, { fontSize: width * 19 }]}>
            {'\n'}
            <Text style={styleG.textBold}>바우만 피부유형 테스트</Text>는 2000년도 초에{'\n'}
            Leslie Baumann 박사가 제시한{'\n'}
            피부 분류법입니다. {'\n'}
            {'\n'}
            자신의 피부 유형을 확인한다면 <Text style={styleG.textBold}>적절한{'\n'}
            피부 관리법</Text>을 선택하는데 도움이 될거에요.
            {'\n'}{'\n'}
            저희와 함께 <Text style={styleG.textBold}> 건성, 지성, 복합성, 민감성</Text>등의{'\n'}
            피부 유형을 식별하여 개인 맞춤형 관리 방안을{'\n'}
            받아 보시겠어요?
          </Text>
          <View style={styles.imgArea}>
          <Image style={styles.img} source={require('../../assets/img/Mbti.png')}></Image>
          </View>
        </View>
      </View>
      <View style={styles.ButtonArea}>
        <BasicButton color={colors.buttonBlue} onPress={goPaper} title={'설문 시작'} />

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
  imgArea:{
    alignItems: 'center',
    height: height * 150,
  },
  img:{
    width: width*300,
    height: height*160,
  }
});
