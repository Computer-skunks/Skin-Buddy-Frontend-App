import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, width, height, styleG } from '../assets/globalStyles'; 
import mbtiData from '../assets/mbtiTest.json';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AnswerBlock({ text, onClick, score, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.answerBlock}>
                <Text style={[styleG.textBold, { fontSize: width * 17, padding: width * 10 }]}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}


function DoTestPaper({ onComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 인덱스를 추적하는 상태
    const [doScore, setDoScore] = useState(0)

    const doKeys = Object.keys(mbtiData.DO); // DO 키 목록

    const saveDoRestult = async (score) => {
        try {
            // 숫자를 문자열로 변환하여 저장
            await AsyncStorage.setItem('doResult', score.toString());
            console.log('doResult has been saved successfully:', score);
        } catch (error) {
            console.error('Failed to save doResult:', error);
        }
    }

    const handleNextPage = async (idx) => {
        setCurrentIndex((prevIndex) => prevIndex + 1); // 현재 인덱스를 증가시킵니다.
        let score = doScore
        switch (idx) {
            case 0:
                score += 1;
                break;
            case 1:
                score += 2;
                break;
            case 2:
                score += 3;
                break;
            case 3:
                score += 4;
                break;
            default:
                score += 2.5;
                break;
        }
        setDoScore(score)

        if (currentIndex >= doKeys.length - 1) {
            saveDoRestult(score)
            onComplete();
        }
    };
    const currentKey = doKeys[currentIndex]; // 현재 키
    const currentData = mbtiData.DO[currentKey]; // 현재 질문 데이터

    return (
        <View style={styles.container}>
            <View style={styles.partArea}>
                <Text style={styleG.textStyle}>지성/건성</Text>
            </View>
            <View style={styles.questArea}>
                <Text style={[styleG.textBold, { fontSize: width * 20, lineHeight: width * 35 }]}>{currentData.questions}</Text>
            </View>
            <View style={styles.answerArea}>
                {currentData.answer.map((answerText, idx) => (
                    <AnswerBlock key={idx} text={answerText} value={idx} onPress={(() => { handleNextPage(idx) })} />
                ))}
            </View>
        </View>
    );
}

function RsTestPaper({ onComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 인덱스를 추적하는 상태
    const [rsScore, setRsScore] = useState(0)

    const rsKeys = Object.keys(mbtiData.RS); // DO 키 목록

    const saveRsResult = async (score) => {
        try {
            // 숫자를 문자열로 변환하여 저장
            await AsyncStorage.setItem('rsResult', score.toString());
            console.log('rsResult has been saved successfully:', score);
        } catch (error) {
            console.error('Failed to save rsResult:', error);
        }
    }

    const handleNextPage = (idx) => {
        setCurrentIndex((prevIndex) => prevIndex + 1); // 현재 인덱스를 증가시킵니다.

        let score = rsScore
        switch (idx) {
            case 0:
                score += 1;
                break;
            case 1:
                score += 2;
                break;
            case 2:
                score += 3;
                break;
            case 3:
                score += 4;
                break;
            default:
                score += 2.5;
                break;
        }
        setRsScore(score)


        if (currentIndex >= rsKeys.length-1) {

            saveRsResult(score)
            onComplete()
        }
    }
    const currentKey = rsKeys[currentIndex]; // 현재 키
    const currentData = mbtiData.RS[currentKey]; // 현재 질문 데이터

    return (
        <View style={styles.container}>
            <View style={styles.partArea}>
                <Text style={styleG.textStyle}>민감성/저항성</Text>
            </View>
            <View style={styles.questArea}>
                <Text style={[styleG.textBold, { fontSize: width * 20, lineHeight: width * 35 }]}>{currentData.questions}</Text>
            </View>
            <View style={styles.answerArea}>
                {currentData.answer.map((answerText, idx) => (
                    <AnswerBlock key={idx} text={answerText} value={idx} onPress={(() => { handleNextPage(idx) })} />
                ))}
            </View>
        </View>
    );

}

function PnTestPaper({ onComplete }) {
    const [pnScore, setPnScore] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 인덱스를 추적하는 상태

    const pnKeys = Object.keys(mbtiData.PN); // PN 키 목록

    const savePnResult = async (score) => {
        try {
            // 숫자를 문자열로 변환하여 저장
            await AsyncStorage.setItem('pnResult', score.toString());
            console.log('pnResult has been saved successfully:', score);
        } catch (error) {
            console.error('Failed to save pnResult:', error);
        }
    }

    const handleNextPage = (idx) => {
        setCurrentIndex((prevIndex) => prevIndex + 1); // 현재 인덱스를 증가시킵니다.

        let score = pnScore
        switch (idx) {
            case 0:
                score += 1;
                break;
            case 1:
                score += 2;
                break;
            case 2:
                score += 3;
                break;
            case 3:
                score += 4;
                break;
            default:
                score += 2.5;
                break;
        }
        setPnScore(score)

        if (currentIndex >= pnKeys.length-1) {
            savePnResult(score);
            onComplete();
        }
    }
    const currentKey = pnKeys[currentIndex]; // 현재 키
    const currentData = mbtiData.PN[currentKey]; // 현재 질문 데이터

    return (
        <View style={styles.container}>
            <View style={styles.partArea}>
                <Text style={styleG.textStyle}>색소성 / 비색소성</Text>
            </View>
            <View style={styles.questArea}>
                <Text style={[styleG.textBold, { fontSize: width * 20, lineHeight: width * 35 }]}>{currentData.questions}</Text>
            </View>
            <View style={styles.answerArea}>
                {currentData.answer.map((answerText, idx) => (
                    <AnswerBlock key={idx} text={answerText} value={idx} onPress={(() => { handleNextPage(idx) })} />
                ))}
            </View>
        </View>
    );
}


function WtTestPaper({ onComplete }) {
    const [wtScore, setWtScore] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 인덱스를 추적하는 상태

    const wtKeys = Object.keys(mbtiData.WT); // DO 키 목록

    const saveWtResult = async (score) => {
        try {
            // 숫자를 문자열로 변환하여 저장
            await AsyncStorage.setItem('wtResult', score.toString());
            console.log('wtResult has been saved successfully:', score);
        } catch (error) {
            console.error('Failed to save wtResult:', error);
        }
    }

    const handleNextPage = (idx) => {
        setCurrentIndex((prevIndex) => prevIndex + 1); // 현재 인덱스를 증가시킵니다.

        let score = wtScore
        switch (idx) {
            case 0:
                score += 1;
                break;
            case 1:
                score += 2;
                break;
            case 2:
                score += 3;
                break;
            case 3:
                score += 4;
                break;
            default:
                score += 2.5;
                break;
        }
        setWtScore(score)


        if (currentIndex >= wtKeys.length-1) {
            saveWtResult(score);
            onComplete();
            return 0;
        }
    }    // 현재 인덱스가 유효한지 확인하고 currentData를 가져옴
    const currentKey = currentIndex < wtKeys.length ? wtKeys[currentIndex] : null;
    const currentData = currentKey ? mbtiData.WT[currentKey] : null;

    if (!currentData) {
        return null; // currentData가 null이면 아무것도 렌더링하지 않음
    }
    return (
        <View style={styles.container}> 
            <View style={styles.partArea}>
                <Text style={styleG.textStyle}>주름 / 탄력</Text>
            </View>
            <View style={styles.questArea}>
                <Text style={[styleG.textBold, { fontSize: width * 20, lineHeight: width * 35 }]}>{currentData.questions}</Text>
            </View>
            <View style={styles.answerArea}>
                {currentData.answer.map((answerText, idx) => (
                    <AnswerBlock key={idx} text={answerText} value={idx} onPress={(() => { handleNextPage(idx) })} />
                ))}
            </View>
        </View>
    );
}


export default function MbtiTestPaper() {

    const navigation = useNavigation();

    const [currentTest, setCurrentTest] = useState('DO'); // 현재 진행 중인 테스트 유형을 추적합니다.

    const handleDoTestComplete = () => {
        // doTestPaper가 완료되었을 때 RS 테스트로 전환합니다.
        setCurrentTest('RS');
    };
    const handleRsTestComplete = () => {
        // doTestPaper가 완료되었을 때 RS 테스트로 전환합니다.
        setCurrentTest('PN');
    };
    const handlePnTestComplete = () => {
        // doTestPaper가 완료되었을 때 RS 테스트로 전환합니다.
        setCurrentTest('WT');
    };
    const handleWtTestComplete = () =>{
        navigation.navigate('MbtiTestResult');


    }

    // 현재 진행 중인 테스트 유형에 따라 다른 컴포넌트를 렌더링합니다.
    if (currentTest === 'DO') {
        return <DoTestPaper onComplete={handleDoTestComplete} />;
    } else if (currentTest === 'RS') {
        return <RsTestPaper onComplete={handleRsTestComplete} />;
    } else if (currentTest === 'PN') {
        return <PnTestPaper onComplete={handlePnTestComplete} />;
    } else if (currentTest === 'WT') {
        return <WtTestPaper onComplete={handleWtTestComplete} />;
    }

    return null;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.mbtiBackColor,
        height: height * 680,
        width: width * 400,
        borderRadius: 15,
        alignItems: 'center',
    },
    answerBlock: {
        backgroundColor: 'white',
        width: width * 380,
        height: height * 70,
        borderWidth: width * 2,
        borderRadius: 15,
        borderColor: colors.darkGray,
        justifyContent: 'center',
        marginLeft: width * 10,
        marginRight: width * 10,
        marginTop: height * 10,
        marginBottom: height * 5,
    },
    questArea: {
        padding: width * 10,
        width: width * 370,
        height: height * 200,
        justifyContent: 'center'
    },
    answerArea: {
        alignItems: 'center',
    },
    partArea: {
        width: width * 380,
        height: height * 40,
        justifyContent: 'center',
    }
});
