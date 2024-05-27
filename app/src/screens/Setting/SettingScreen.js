
import React, {useContext } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { colors, width, height } from '../../assets/globalStyles';
import Subseperator from '../../components/Subseperator';
import BasicButton from '../../components/BasicButton';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../../AuthProvider';
import * as Updates from 'expo-updates';



function List({ title, component, type }) {
  const { logout, deleteAccount, userId } = useContext(AuthContext);

  const navigation = useNavigation();


  const LogoutProcess = async () => {
    if(userId!='customer'){
      Alert.alert(
        '로그아웃',
        '로그아웃 하시겠습니까?',
        [
          {
            text: '확인', onPress: async () => {
              await logout();
              await Updates.reloadAsync();
            }
          }, { text: '취소' }
        ],
      );
      
    }
    else{
      Alert.alert(
        '로그인',
        '로그인 하시겠습니까?',
        [
          {
            text: '확인', onPress: async () => {
              await logout();
              await Updates.reloadAsync();
            }
          }, { text: '취소' }
        ],
      );

    }
  }


  if (type == 'logout') {
    return (
      <View style={{ marginBottom: height * 30 }}>
        <TouchableOpacity onPress={LogoutProcess}>
          <Text style={{ fontSize: width * 25, fontFamily: 'NanumSquareRoundB', color: colors.textGray }}> - {title}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  else {
    return (
      <View style={{ marginBottom: height * 30 }}>
        <TouchableOpacity onPress={() => { navigation.navigate(component) }}>
          <Text style={{ fontSize: width * 25, fontFamily: 'NanumSquareRoundB', color: colors.textGray }}> - {title}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default function SettingScreen() {

  const navigation = useNavigation();

  const { userName, userId } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <Text style={{ fontSize: width * 35, color: 'gray', width: width * 270, fontFamily: 'NanumSquareRoundEB' }}>{userName}</Text>
        {userId != 'customer' ? <BasicButton color={colors.highlightBlue} title={'프로필 편집'} category={'sideMargin'} size={100} onPress={() => { navigation.navigate('ProfileEdit') }} /> : <View style={{ width: width * 100 }}></View>}

      </View>
      <View style={styles.subArea}>
        <Subseperator />
      </View>
      {userId != 'customer' ?
        <View style={styles.listArea}>
          <List title={'버전 정보 조회'} component={'VersionInformation'} />
          <List title={'이용 약관 조회'} component={'TermsOfUse'} />
          <List title={'공지사항 조회'} component={'Notice'} />
          <List title={'Q&A 작성'} component={'QandAWrite'} />
          <List title={'Q&A 조회'} component={'QandAList'} />
          <List title={'로그아웃'} type={'logout'} />
          <List title={'비밀번호 변경'} component={'ChangePassword'} />
          <List title={'계정 탈퇴'} component={'DeleteAccount'} />
        </View>
        :
      <View style={styles.listArea}>
        <List title={'버전 정보 조회'} component={'VersionInformation'} />
        <List title={'이용 약관 조회'} component={'TermsOfUse'} />
        <List title={'공지사항 조회'} component={'Notice'} />
        <List title={'로그인'} type={'logout'} />
      </View>
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingBottom: 20
  },
  topArea: {
    marginLeft: width * 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 10,
    marginBottom: height * 10,
  },
  listArea: {
    height: height * 500,
    width: width * 300,
    marginLeft: width * 25,
    marginTop: height * 20,

  },




});
