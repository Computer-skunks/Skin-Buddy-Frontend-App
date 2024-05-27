import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, width, height } from '../assets/globalStyles'; //width,height 받아오기

export default function BasicButton({ title, onPress, color, size, category, able }) {
    if(able==undefined){
        able=false
    }
    if (size == undefined) {
        size = 116
    }
    if (category == 'topMargin') {
        return (
            <TouchableOpacity style={[styleSheet.button, { backgroundColor: color, width: width * size, marginTop:10, }]} onPress={onPress} disabled={able}>
                <Text style={styleSheet.textStyle}>{title}</Text>
            </TouchableOpacity>
        )
    }
    else if (category == 'sideMargin') {
        return (
            <TouchableOpacity style={[styleSheet.button, { backgroundColor: color, width: width * size, marginRight: width * 10,marginLeft: width* 10}]} onPress={onPress} disabled={able}>
                <Text style={styleSheet.textStyle}>{title}</Text>
            </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacity style={[styleSheet.button, { backgroundColor: color, width: width * size, }]} onPress={onPress} disabled={able}>
                <Text style={styleSheet.textStyle}>{title}</Text>
            </TouchableOpacity>
        )
    }

}

const styleSheet = StyleSheet.create({

    button: {
        height: height * 50,
        borderRadius: width * 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle:
    {
        fontFamily: "NanumSquareRoundB",
        fontWeight: 'bold',
        color: 'white',
        fontSize: width * 17
    }

})
