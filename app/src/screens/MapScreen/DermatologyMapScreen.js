import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import {  width, height } from '../../assets/globalStyles';
import axios from 'axios';

const API_KEY = 'AIzaSyA4EYTmaLvI6RkzJaZSm1ssdVUfC6i9b4Q';


const DermatologyMapScreen = () => {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      fetchNearbyPlaces(location.coords);
    })();
  }, []);

  const fetchNearbyPlaces = async (coords) => {
    const { latitude, longitude } = coords;
    const radius = 2000; 
    const type = '병원';
    const keyword = '피부과';

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&keyword=${keyword}&key=${API_KEY}`
      );

      console.log('API Response:', response.data);

      if (response.data.status === "OK") {
        setPlaces(response.data.results);
      } else if (response.data.status === "ZERO_RESULTS") {
        setErrorMsg('No dermatology clinics found in this area.');
      } else {
        console.error("Places API error: ", response.data.status);
        setErrorMsg(`Places API error: ${response.data.status}`);
      }
    } catch (error) {
      console.error("Error fetching places: ", error);
      setErrorMsg('Error fetching places');
    }
  };

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{errorMsg ? errorMsg : 'Loading...'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      >
        {places.map((place, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            title={place.name}
            description={place.vicinity}
          />
        ))}
      </MapView>
      {errorMsg && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:width*430,
    height: height* 700,

  },
  map: {
    flex:1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default DermatologyMapScreen;