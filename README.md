졸업프로젝트   
Skin Buddy - AI 피부관리 도우미 서비스
=============


<img width="300" alt="스킨버디로고" src="https://github.com/BaekJiyeon02/ReactNative-SkinBuddy/assets/102474999/57511e1b-b968-4a99-99a9-34420084291b">



📌 설계 및 개발 기간
-------------
* 2024.03.08 - 2024.06.07
<img width="870" alt="구현진도계획" src="https://github.com/BaekJiyeon02/ReactNative-SkinBuddy/assets/102474999/f12302c4-3b52-499a-819b-769e19c6e240">



📌 프로젝트 개요
-------------

### 1. 서비스 선정 이유

 - 미용에 관한 관심 지속적으로 증가 추세
 - 피부 고민은 병원을 방문해서 진단받아야 하는 번거로움
 - 혁신 기술을 바탕으로 미용 서비스 제공 가능

### 2. 디렉터리 구조

```bash
       app
         ├── App.js
         ├── AuthProvider.js
         └── src
             ├── assets
             │   ├── fonts
             │   ├── globalStyles.js
             │   ├── img
             │   ├── Acne.json
             │   ├── mbtiResult.json
             │   └── mbtiTest.json
             ├── components
             │   ├── AdBanner.tsx
             │   ├── BasicButton.js
             │   ├── FindId.js
             │   ├── FindPassword.js
             │   ├── InputTextBox.js
             │   ├── MbtiGraph.js
             │   ├── MbtiTestPaper.js
             │   └── Subseperator.js
             └── screens
                 ├── AcneAnalysis
                 │   ├── AcneAnalysisResultScreen.js
                 │   └── AcneAnalysisScreen.js
                 ├── History
                 │   └── HistoryScreen.js
                 ├── ImprovementAnalysis
                 │   ├── ImprovementAnalysisResultScreen.js
                 │   └── ImprovementAnalysisScreen.js
                 ├── Login
                 │   ├── FindAccountScreen.js
                 │   ├── JoinScreen.js
                 │   └── LoginScreen.js
                 ├── MainScreen.js
                 ├── MapScreen
                 │   └── DermatologyMapScreen.js
                 ├── MbtiTest
                 │   ├── MbtiTestPaperScreen.js
                 │   ├── MbtiTestResultScreen.js
                 │   └── MbtiTestScreen.js
                 └── Setting
                     ├── ChangePasswordScreen.js
                     ├── DeleteAccountScreen.js
                     ├── NoticeScreen.js
                     ├── ProfileEditScreen.js
                     ├── QandAListScreen.js
                     ├── QandAWriteScreen.js
                     ├── SettingScreen.js
                     ├── TermsOfUseScreen.js
                     └── VersionInformationScreen.js
```


### 3. 서비스 설명

-대표적인 앱의 기능인 AI 트러블 유형 분석, AI 트러블 호전도 분석, 바우만 피부 유형 테스트로 구성
      
<img width="835" alt="서비스설명" src="https://github.com/BaekJiyeon02/ReactNative-SkinBuddy/assets/102474999/631fdbb2-bb40-4cd2-9d8a-b88ed5320e34">


   
 ### 4. 프로젝트 개발 범위
   
<img width="800" alt="프로젝트개발범위" src="https://github.com/BaekJiyeon02/ReactNative-SkinBuddy/assets/102474999/1ef1a90b-1465-4983-82ab-bc1cb9df3fb0">


   
 ### 5. 시스템 기능 구성
   
<img width="800" alt="시스템기능구성" src="https://github.com/BaekJiyeon02/ReactNative-SkinBuddy/assets/102474999/a35eb76d-4b53-4ad0-99da-4355ea03ff48">



 ### 6. 아키텍쳐
   
<img width="800" alt="아키텍쳐" src="https://github.com/BaekJiyeon02/ReactNative-SkinBuddy/assets/102474999/5382c5bf-8579-4f58-9da4-ec2064e942c0">



 ### Stack
   #### Frontend
- <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
- <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
- <img src="https://img.shields.io/badge/react native-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>

* * *


📌 시연 화면
-------------

- #### 회원가입 / 아이디, 비밀번호 찾기
https://github.com/BaekJiyeon02/ReactNative-SkinBuddy/assets/102474999/e1699b7e-51c6-4776-a2dd-b9b643c9425a


- #### AI 트러블 분석
https://github.com/BaekJiyeon02/ReactNative-SkinBuddy/assets/102474999/e0d89b70-74f1-4e87-b1ff-cacf07b5d8b7


- #### AI 호전도 분석
https://github.com/BaekJiyeon02/ReactNative-SkinBuddy/assets/102474999/7908daed-4bc5-4363-ac46-557ee3c7f527


- #### 바우만 피부타입 테스트
https://github.com/BaekJiyeon02/ReactNative-SkinBuddy/assets/102474999/5a1a077c-64e0-4ac5-adb9-79de1802e00e


- #### 과거 진단 기록 
https://github.com/BaekJiyeon02/ReactNative-SkinBuddy/assets/102474999/028ad751-c389-4e69-bab9-93bb01eb2817


* * *

📌 프로젝트 실행
-------------

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo


📌 베포 링크
-------------
- android: [download apk](https://expo.dev/artifacts/eas/4vxonsXCXWAiFQsBQ1aFCp.apk)

