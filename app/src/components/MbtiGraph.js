import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { width, height } from '../assets/globalStyles'; //width,height 받아오기


export default function BasicButton({ category, score }) {




  switch (category) {
    case 'Dry':
      return (
        <View style={styles.conatiner}>
          {/* D 건성 */}
          <View style={{ width: width * 160, height: height * 23, backgroundColor: "#FF5959", top: 9, left: 30, position: 'absolute' }}></View>
          {/* O 지성 */}
          <View style={{ width: width * score, height: height * 23, backgroundColor: "#FFD4AC", top: 9, right: 30, position: 'absolute' }}></View>
          <View style={styles.leftItem}>
            <View style={[styles.leftCircle, { backgroundColor: "#FF9494" }]}>
              <Text style={styles.circleText}>D</Text>
            </View>
            <Text style={styles.bottomLeftText}>건성</Text>
          </View>
          <View style={styles.rightItem}>
            <View style={[styles.rightCircle, { backgroundColor: "#FFC48D" }]}>
              <Text style={styles.circleText}>O</Text>
            </View>
            <Text style={styles.bottomRightText}>지성</Text>
          </View>
        </View>

      )

    case 'Oily':
      return (
        <View style={styles.conatiner}>
          {/* O 지성 */}
          <View style={{ width: width * 160, height: height * 23, backgroundColor: "#FFD4AC", top: 9, left: 30, position: 'absolute' }}></View>
          {/* D 건성 */}
          <View style={{ width: width * score, height: height * 23, backgroundColor: "#FF5959", top: 9, right: 30, position: 'absolute' }}></View>
          <View style={styles.leftItem}>
            <View style={[styles.leftCircle, { backgroundColor: "#FF9494" }]}>
              <Text style={styles.circleText}>D</Text>
            </View>
            <Text style={styles.bottomLeftText}>건성</Text>
          </View>
          <View style={styles.rightItem}>
            <View style={[styles.rightCircle, { backgroundColor: "#FFC48D" }]}>
              <Text style={styles.circleText}>O</Text>
            </View>
            <Text style={styles.bottomRightText}>지성</Text>
          </View>
        </View>

      )


    case 'Sensitive':

      return (
        <View style={styles.conatiner}>
          <View style={{ width: width * 160, height: height * 23, backgroundColor: "#FFD159", top: 9, right: 30, position: 'absolute' }}></View>
          <View style={{ width: width * score, height: height * 23, backgroundColor: "#FFF48E", top: 9,left: 30, position: 'absolute' }}></View>
          <View style={styles.leftItem}>
            <View style={[styles.leftCircle, { backgroundColor: "#FFE194" }]}>
              <Text style={styles.circleText}>R</Text>
            </View>
            <Text style={styles.bottomLeftText}>민감성</Text>
          </View>
          <View style={styles.rightItem}>
            <View style={[styles.rightCircle, { backgroundColor: "#FFED4C" }]}>
              <Text style={styles.circleText}>S</Text>
            </View>
            <Text style={styles.bottomRightText}>저항성</Text>
          </View>
        </View>
      )
    case 'Resistent':

      return (
        <View style={styles.conatiner}>
          <View style={{ width: width * 160, height: height * 23, backgroundColor: "#FFF48E", top: 9, right: 30, position: 'absolute' }}></View>
          <View style={{ width: width * score, height: height * 23, backgroundColor: "#FFD159", top: 9, left: 30, position: 'absolute' }}></View>
          <View style={styles.leftItem}>
            <View style={[styles.leftCircle, { backgroundColor: "#FFE194" }]}>
              <Text style={styles.circleText}>R</Text>
            </View>
            <Text style={styles.bottomLeftText}>민감성</Text>
          </View>
          <View style={styles.rightItem}>
            <View style={[styles.rightCircle, { backgroundColor: "#FFED4C" }]}>
              <Text style={styles.circleText}>S</Text>
            </View>
            <Text style={styles.bottomRightText}>저항성</Text>
          </View>
        </View>
      )

    case 'Pigment':

      return (
        <View style={styles.conatiner}>
          <View style={{ width: width * 160, height: height * 23, backgroundColor: "#B3EEE0", top: 9, right: 30, position: 'absolute' }}></View>
          <View style={{ width: width * score, height: height * 23, backgroundColor: "#50C846", top: 9, left: 30, position: 'absolute' }}></View>

          <View style={styles.leftItem}>
            <View style={[styles.leftCircle, { backgroundColor: "#77D881" }]}>
              <Text style={styles.circleText}>P</Text>
            </View>
            <Text style={styles.bottomLeftText}>색소</Text>
          </View>
          <View style={styles.rightItem}>
            <View style={[styles.rightCircle, { backgroundColor: "#91E0CD" }]}>
              <Text style={styles.circleText}>N</Text>
            </View>
            <Text style={styles.bottomRightText}>비색소</Text>
          </View>
        </View>


      )
    case 'Non-Pigment':

      return (
        <View style={styles.conatiner}>
            <View style={{ width: width * 160, height: height * 23, backgroundColor: "#50C846", top: 9, right: 30, position: 'absolute' }}></View>
            <View style={{ width: width * score, height: height * 23, backgroundColor: "#B3EEE0", top: 9, left: 30, position: 'absolute' }}></View>
          <View style={styles.leftItem}>
            <View style={[styles.leftCircle, { backgroundColor: "#77D881" }]}>
              <Text style={styles.circleText}>P</Text>
            </View>
            <Text style={styles.bottomLeftText}>색소</Text>
          </View>
          <View style={styles.rightItem}>
            <View style={[styles.rightCircle, { backgroundColor: "#91E0CD" }]}>
              <Text style={styles.circleText}>N</Text>
            </View>
            <Text style={styles.bottomRightText}>비색소</Text>
          </View>
        </View>


      )


    case 'Wrinkle':
      return (
        <View style={styles.conatiner}>
          <View style={{ width: width * 160, height: height*23, backgroundColor: "#DBDAFF", top: 9, right: 30, position: 'absolute' }}></View>
          <View style={{ width: width * score, height: height*23, backgroundColor: "#9AC8FF", top: 9, left: 30, position: 'absolute' }}></View>
          <View style={styles.leftItem}>
            <View style={[styles.leftCircle, { backgroundColor: "#A4CEFF" }]}>
              <Text style={styles.circleText}>W</Text>
            </View>
            <Text style={styles.bottomLeftText}>주름</Text>
          </View>
          <View style={styles.rightItem}>
            <View style={[styles.rightCircle, { backgroundColor: "#BEBDFF" }]}>
              <Text style={styles.circleText}>T</Text>
            </View>
            <Text style={styles.bottomRightText}>탄력</Text>
          </View>
        </View>
      )

    case 'Tight':
      return (
        <View style={styles.conatiner}>
          <View style={{ width: width * 160, height: height*23, backgroundColor: "#9AC8FF", top: 9, right: 30, position: 'absolute' }}></View>
          <View style={{ width: width * score, height: height*23, backgroundColor: "#DBDAFF", top: 9, left: 30, position: 'absolute' }}></View>
          <View style={styles.leftItem}>
            <View style={[styles.leftCircle, { backgroundColor: "#A4CEFF" }]}>
              <Text style={styles.circleText}>W</Text>
            </View>
            <Text style={styles.bottomLeftText}>주름</Text>
          </View>
          <View style={styles.rightItem}>
            <View style={[styles.rightCircle, { backgroundColor: "#BEBDFF" }]}>
              <Text style={styles.circleText}>T</Text>
            </View>
            <Text style={styles.bottomRightText}>탄력</Text>
          </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  conatiner: {
    width: width * 200,
    height: height * 59,
    marginTop: height * 3,
  },
  textStyle: {
    fontFamily: "NanumSquareRoundB",
    fontWeight: 'bold',
    color: 'white',
    fontSize: width * 15,
  },
  leftCircle: {
    width: width * 40,
    height: height * 40,
    position: 'absolute',
    borderRadius: 50,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',

  },
  rightCircle: {
    width: width * 40,
    height: height * 40,
    position: 'absolute',
    borderRadius: 50,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    fontSize: width * 14,
  },
  bottomLeftText: {
    top: height * 42,
    fontSize: width * 14
  },
  bottomRightText: {
    top: height * 42,
    fontSize: width * 14
  },
  leftItem: {
    position: 'absolute',
    width: width * 40,
    alignItems: 'center',
  },
  rightItem: {
    position: 'absolute',
    width: width * 40,
    alignItems: 'center',
    right: 0,

  }
})
