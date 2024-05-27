
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputTextBox from './InputTextBox';
import BasicButton from './BasicButton';
import { styleG, colors, width, height } from '../assets/globalStyles';
import * as Clipboard from 'expo-clipboard';
import axios from 'axios';

export default function FindId() {
    const navigation = useNavigation();
    const findIdApiUrl = 'http://52.79.237.164:3000/user/find/id';

    const [inputTel, setInputTel] = useState('')

    const hadleSetTel = (text) => {
        setInputTel(text)
    }
    // 클립보드에 텍스트 복사
    const copyToClipboard = async (text) => {
        try{
        await Clipboard.setString(text);
        console.log('텍스트가 클립보드에 복사되었습니다.');
    }catch(error){
        console.log(error)
    }
    };

    const handleFindIdProcess = () => {
        const postData = {
            "tel": inputTel
        }
        axios.post(findIdApiUrl, postData)
            .then(response => {
                // 요청 성공 시 처리
                console.log(response.data['userId'])
                if(response.data['property']==200){
                    Alert.alert(
                        `아이디:${response.data['userId']}`,
                        '',
                        [
                            { text: '복사', onPress: () => copyToClipboard(response.data['userId']) },
                        ],
                        { cancelable: false } // 경고 창을 취소할 수 없는 경우 설정합니다.
                    );
                }
                else if(response.data['property']==301){
                    Alert.alert(
                        response.data['message'],
                        '',
                        [
                            { text: '확인' },
                        ],
                        { cancelable: false } // 경고 창을 취소할 수 없는 경우 설정합니다.
                    );
                }
            })
            .catch(error => {
                // 요청 실패 시 처리
                console.error('Error:', error);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentsArea}>
                <View style={styles.inputArea}>
                    <InputTextBox title={'Tel'} name={'user_tel'} onChangeText={hadleSetTel}></InputTextBox>
                </View>
                <View style={styles.buttonArea}>
                    <BasicButton color={colors.loginBlue} size={300} title={"확인"} onPress={handleFindIdProcess} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: height * 270,
        width: width * 380,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: height * 20,
        backgroundColor: colors.softGray,
        borderWidth: 1,
        borderColor: colors.darkGray,
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15,
    },
    inputArea: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 150
    },
    contentsArea: {
        height: height * 200,
        justifyContent: 'flex-end',
    }

});
