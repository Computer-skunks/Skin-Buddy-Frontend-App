import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {  width, height, styleG } from '../../assets/globalStyles';
import Subseperator from '../../components/Subseperator'
import axios from 'axios';


export default function NoticeScreen() {

  const noticeUrl = 'http://52.79.237.164:3000/user/notice/list';

  const [list, setList] = useState([])

  const [expandedIndex, setExpandedIndex] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      noticeReturn();
      return () => {

      };
    }, [])
  );


  function noticeReturn() {
    axios.get(noticeUrl)
      .then(response => {
        console.log('응답 데이터:', response.data);
        setList(response.data["list"]);
      })
      .catch(error => {
        console.error('에러 발생:', error);
      });
  }

  const handlePress = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={{ fontSize: width * 35, color: 'gray', width: width * 270, fontFamily: 'NanumSquareRoundEB' }}>공지사항</Text>
      </View>
      <Subseperator />
      <View style={styles.listArea}>

        <FlatList
          data={list}
          renderItem={({ item, index }) => (
            <TouchableWithoutFeedback onPress={() => handlePress(index)}>
              <View style={{ marginBottom: width * 10, alignItems:'center' }}>
                <Subseperator type={"thin"} />
                <View style={{ padding: width * 15, width:width*380 }}>
                  <Text>{item.reviceDay}</Text>
                  {expandedIndex === index ? (
                    <Text style={[styleG.textStyle, { fontSize: width * 20 }]}>{item.content}</Text>
                  ) : (
                    <Text numberOfLines={1} style={[styleG.textStyle, { fontSize: width * 20 }]}>
                      {item.content.split(":")[0]}
                    </Text>
                  )}
                </View>
                <Subseperator type={"thin"} />
              </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={(item, index) => index.toString()}
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
