import React,{useState, useEffect} from 'react';
import { Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { isBreakOrContinueStatement } from 'typescript';
import { colors, width, height, styleG } from '../assets/globalStyles'; //width,height 받아오기

export default function InputTextBox({ title, onChangeText, type}) {
    const [secureType, setSecureType] = useState(false);

    useEffect(() => {

        if (type === 'password') {
            setSecureType(true);
        } else {
            setSecureType(false);
        }

    }, [type]);

    return (
        <TextInput
        title={title}
        style={styles.textBox}
        placeholder={title}
        placeholderTextColor={colors.gray}
        onChangeText={onChangeText}
        secureTextEntry={secureType}
        autoCapitalize = 'none'
        />
    )
}

const styles = StyleSheet.create({

    textStyle:
    {
        fontWeight: 'bold',
        color: 'white',
        fontSize: width * 15
    },
    textBox:{
        fontFamily: "NanumSquareRoundEB",
        fontSize: 15,
        backgroundColor : colors.inputBoxColor,
        width: width * 300,
        height: height * 50, 
        borderRadius: 7,
        paddingLeft: 10,
        marginTop : width * 10,
    }

})
