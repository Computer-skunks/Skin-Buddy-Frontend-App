import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import axios from 'axios';
import * as Updates from 'expo-updates';



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [skinType, setSkinType] = useState('????');
    const [doScore, setDoScore] = useState(0);
    const [rsScore, setRsScore] = useState(0);
    const [pnScore, setPnScore] = useState(0);
    const [wtScore, setWtScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userTel, setUserTel] = useState('')

    const homeProfileUrl = 'http://52.79.237.164:3000/user/home/profile';
    const profileUrl = 'http://52.79.237.164:3000/user/profile';
    const deleteUrl = 'http://52.79.237.164:3000/user/delete';
    const changeUrl = 'http://52.79.237.164:3000/user/change/psword';
    const profileChangeUrl = 'http://52.79.237.164:3000/user/profile/update';



    // AsyncStorage에서 로그인 상태와 사용자 아이디를 불러오는 함수
    const loadAuthData = async () => {
        setLoading(true)
        try {
            const storedUserId = await AsyncStorage.getItem('userId');
            console.log('userId:', storedUserId)
            if (storedUserId !== null) {
                setUserId(storedUserId);
                profileCall(storedUserId)

                homeProfileCall(storedUserId)


            }
            else if (storedUserId == null) {
                setUserId(false)

            }
        } catch (error) {
            console.error('Failed to load user ID from AsyncStorage:', error);
        }
    };

    useEffect(() => {
        loadAuthData();
    }, [userId]);

    // 로그인 상태를 업데이트하는 함수
    const login = async (id) => {
        try {
            await AsyncStorage.setItem('userId', id);
            setUserId(id);
        } catch (error) {
            console.error('Failed to store user ID in AsyncStorage:', error);
        }
        setLoading(false);
    };

    // 로그아웃 상태를 업데이트하는 함수
    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userId');
            setUserId(null);
        } catch (error) {
            console.error('Failed to remove user ID from AsyncStorage:', error);
        }
    };

    //계정 탈퇴 함수
    const deleteAccount = async (pwd) => {
        const userPwd = pwd
        const postData = {
            "userId": userId,
            "psword": userPwd
        };
        await axios.delete(deleteUrl, { data: postData })
            .then(response => {
                // 요청 성공 시 처리
                console.log(response.data)
                console.log(postData)
                if (response.data['property'] == 200) {
                    logout();
                    Updates.reloadAsync();
                }
                else if (response.data['property'] == 301) {
                    console.log(response.data)
                    Alert.alert(
                        response.data['message'],
                        '',
                        [
                            { text: '확인' },
                        ],
                    );
                }
            })
            .catch(error => {
                // 요청 실패 시 처리
                console.log(error)
            })

    }

    //비밀번호 변경 함수
    const changePassword = (pwd, newPwd) => {

        const postData = {
            "userId": userId,
            "psword": pwd,
            "newPsword": newPwd
        };
        console.log(postData)
        axios.put(changeUrl, postData)
            .then(response => {
                // 요청 성공 시 처리
                if (response.data['property'] == 200) {

                    Alert.alert(
                        '변경되었습니다',
                        '',
                        [
                            {
                                text: '확인', onPress: async () => {
                                    Updates.reloadAsync();
                                }
                            }
                        ],
                    );
                }
                else if (response.data['property'] == 301) {
                    console.log(response.data)
                    Alert.alert(
                        response.data['message'],
                        '',
                        [
                            { text: '확인' },
                        ],
                    );
                }
            })
            .catch(error => {
                // 요청 실패 시 처리
                console.error('Failed to change user password:', error);
            });


    }
    // (홈페이지)프로필을 불러오는 함수
    const homeProfileCall = async (id) => {
        console.log('homeProfileCall')
        if (userId == 'customer' || userId == null) {
            setUserName('비회원');
        }
        else if (userId != 'cusotmer') {
            const postData = {
                "userId": id,
            };
            await axios.post(homeProfileUrl, postData)
                .then(response => {
                    // 요청 성공 시 처리
                    console.log(response.data)
                    homeProfile(response.data)
                })
                .catch(error => {
                    // 요청 실패 시 처리
                    console.error('Failed to load user profile:', error);
                });
        }
    }
    //(홈페이지)프로필 상태를 업데이트 하는 함수
    const homeProfile = async (data) => {
        console.log(userId)

        if (userId == 'customer' || userId == null) {
            setUserName('비회원');

        }
        else if (userId != 'cusotmer') {

            setLoading(true)
            try {
                console.log('data: ', data)
                setUserName(data['nickname']);

                if (data['skinType'] !== null) {

                    
                    setDoScore(data['oilyScore'])
                    setRsScore(data['resistanceScore'])
                    setPnScore(data['non_pigmentScore'])
                    setWtScore(data['tightScore'])
                    setSkinType(data['skinType'])

                    await AsyncStorage.setItem('skinType', data['skinType']);

                    setLoading(false);

                }
                else if (data['skinType'] == null) {
                    setSkinType('????')
                }

            } catch (error) {
                console.error('Failed to update user profile:', error);
                
            }
            setLoading(false);
        }
    }
    // 프로필을 불러오는 함수
    const profileCall = async (id) => {
        if (userId == 'customer' || userId == null) {
            profile(null)

        }
        else if (userId != 'cusotmer') {


            const postData = {
                "userId": id,
            };
            axios.post(profileUrl, postData)
                .then(response => {
                    // 요청 성공 시 처리
                    console.log(response.data)
                    profile(response.data)
                })
                .catch(error => {
                    // 요청 실패 시 처리
                    logout()
                    console.error('Failed to load user profile:', error);
                });
        }
    }

    //프로필 상태를 업데이트 하는 함수
    const profile = async (data) => {
        if (data == null) {
            setLoading(false)
        }
        else {
            setLoading(true)
            try {
                setUserTel(data['tel'])
            } catch (error) {
                console.error('Failed to send user profile:', error);
            }
            setLoading(false);
        }
    }

    const updateProfile = (name, tel) => {

        const postData = {
            "userId": userId,
            "nickname": name,
            "tel": tel
        }
        setLoading(true)
        axios.put(profileChangeUrl, postData)
            .then(response => {
                // 요청 성공 시 처리
                console.log(response.data)
                if (response.data['property'] == 200) {

                    console.log(postData)
                    Alert.alert(
                        response.data['message'],
                        '',
                        [
                            {
                                text: '확인', onPress: () => {
                                    Updates.reloadAsync();
                                    setLoading(false)
                                }
                            },
                        ],
                    );
                }

                else if (response.data['property'] == 304) {
                    Alert.alert(
                        response.data['message'],
                        '',
                        [
                            {
                                text: '확인', onPress: () => {
                                    setLoading(false)
                                }
                            },
                        ],
                    );
                }
            })
            .catch(error => {
                // 요청 실패 시 처리
                console.error('Failed to change user profile:', error);
            });

    }

    const refreshMbti = async() => {
        console.log('refreshMbti')
        await homeProfileCall(userId)

    }

    const noLoginState = async (id) => {
        try {
            await AsyncStorage.setItem('userId', id);
            setUserId(id);
        } catch (error) {
            console.error('Failed to store user ID in AsyncStorage:', error);
        }
        setLoading(false);
    };



    return (
        <AuthContext.Provider value={{ homeProfile,userId, login, noLoginState, logout, loading, setLoading, userName, skinType, doScore, rsScore, pnScore, wtScore, changePassword, refreshMbti, deleteAccount, userTel, updateProfile, setSkinType }}>
            {children}
        </AuthContext.Provider>
    );
};