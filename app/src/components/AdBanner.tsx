import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, FlatList, Image, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios'; // axios를 사용하여 API 호출
import { colors, width, height, styleG } from '../assets/globalStyles';

interface Advertisement {
  advertisementId: number;
  photo: string; // base64로 인코딩된 사진 파일
}

export default function AdBanner() {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

  useEffect(() => {
    // API 호출
    axios.get('http://52.79.237.164:3000/manager/advertise/list')
      .then(response => {
        // API 응답에서 데이터 추출
        const data = response.data.data;
        setAdvertisements(data);
      })
      .catch(error => {
        console.error('Error fetching advertisements:', error);
      });
  }, []);

  const renderAdvertisement = ({ item }: { item: Advertisement }) => {
    return (
      <TouchableOpacity onPress={() => console.log('clicked')}>
        <Image source={{ uri: `data:image/png;base64,${item.photo}` }} style={styles.sliderImage} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={advertisements}
        renderItem={renderAdvertisement}
        keyExtractor={item => item.advertisementId.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 320 * Number(height),
  },
  sliderImage: {
    width: 430 * Number(width),
    height: 250 * Number(height),
    resizeMode: 'cover',
    marginVertical: 50 * Number(height),
  },
});
