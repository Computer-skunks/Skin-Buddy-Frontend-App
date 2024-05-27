import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { colors, width, height, styleG } from '../../assets/globalStyles';
import BasicButton from '../../components/BasicButton'
import Subseperator from '../../components/Subseperator'
import axios from 'axios';
import { AuthContext } from '../../../AuthProvider';


export default function QandAListScreen() {

  const { userId } = useContext(AuthContext);

  const qaListUrl = 'http://52.79.237.164:3000/user/question/list';

  const [list, setList] = useState([])

  const [expandedIndex, setExpandedIndex] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      qaReturn();
      return () => {
      };
    }, [])
  );

  const navigation = useNavigation();

  function qaReturn() {

    const postData = {
      "userId": userId
    }

    axios.post(qaListUrl, postData)
      .then(response => {
        console.log('응답 데이터:', response.data);
        setList(response.data["list"]);
        console.log(list[1]);
      })
      .catch(error => {
        console.error('에러 발생:', error);
      });
  }

  const goCamera = () => {
    navigation.navigate('카메라');
  }
  const goAlbum = () => {
    navigation.navigate('앨범');
  }

  const handlePress = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={{ fontSize: width * 35, color: 'gray', width: width * 270, fontFamily: 'NanumSquareRoundEB' }}>Q&A 조회</Text>
      </View>
      <Subseperator />
      <View style={styles.listArea}>
        {/* {list.map((qa, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => handlePress(index)}>
            <View style={{ marginBottom: width * 10 }}>
              <Subseperator type={"thin"} />
              <View style={{ padding: width * 15 }}>
                <Text>{qa.createday}</Text>
                {expandedIndex === index ? (
                  <View>
                  <Text style={[styleG.textStyle, { fontSize: width * 20 }]}>[{qa.answer ? (<Text style={{color:colors.highlightBlue}}>답변완료</Text>) : (<Text style={{color:colors.highlightRed}}>답변대기</Text>)}] {qa.question}</Text>
                  
                  {qa.answer?(<Text style={[styleG.textStyle, { fontSize: width * 20, marginTop:height * 15 }]}><Text style={{color:colors.highlightBlue}}>답변 :</Text>{qa.answer}</Text>):(<Text></Text>)}
                  </View>
                ) : (
                  <View>
                  <Text numberOfLines={1} style={[styleG.textStyle, { fontSize: width * 20 }]}>[{qa.answer ? (<Text style={{color:colors.highlightBlue}}>답변완료</Text>) : (<Text style={{color:colors.highlightRed}}>답변대기</Text>)}] {qa.question}</Text>
                  </View>
                  )}
              </View>
              <Subseperator type={"thin"} />
            </View>
          </TouchableWithoutFeedback>
        ))} */}


        <FlatList
          data={list}
          renderItem={({ item, index }) => (
            <TouchableWithoutFeedback onPress={() => handlePress(index)}>
              <View style={{ marginBottom: width * 10, alignItems: 'center' }}>
                <Subseperator type={"thin"} />
                <View style={{ padding: width * 15, width: width * 380 }}>
                  <Text>{item.createday}</Text>
                  {expandedIndex === index ? (
                    <View>
                      <Text style={[styleG.textStyle, { fontSize: width * 20 }]}>[{item.answer ? (<Text style={{ color: colors.highlightBlue }}>답변완료</Text>) : (<Text style={{ color: colors.highlightRed }}>답변대기</Text>)}] {item.question}</Text>

                      {item.answer ? (<Text style={[styleG.textStyle, { fontSize: width * 20, marginTop: height * 15 }]}><Text style={{ color: colors.highlightBlue }}>답변 :</Text>{item.answer}</Text>) : (<Text></Text>)}
                    </View>
                  ) : (
                    <View>
                    <Text numberOfLines={1} style={[styleG.textStyle, { fontSize: width * 20 }]}>[{item.answer ? (<Text style={{color:colors.highlightBlue}}>답변완료</Text>) : (<Text style={{color:colors.highlightRed}}>답변대기</Text>)}] {item.question}</Text>
                    </View>
                  )}
                </View>
                <Subseperator type={"thin"} />
              </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={(qa, index) => index.toString()}
        />
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
    width: width * 380,
    alignItems: 'flex-start',
    marginBottom: width * 10,
    marginLeft: width * 20,
  },
  listArea: {
    marginTop: height * 20,
    width: width * 400,
    height: height * 500,
    alignItems:'center',
    justifyContent:'center',
  }
});
