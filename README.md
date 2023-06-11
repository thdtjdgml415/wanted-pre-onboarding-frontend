# 6월 프리온보딩 프론트엔드 사전과제

이 프로젝트는 6월차 원티드 프리온보딩 과정에서 진행한 프론트엔드 사전과제입니다. 이 웹 애플리케이션은 사용자가 원하는 기능을 제공하도록 작성되었습니다.

## 개발자 정보

```
- 이름: 송성희
- 이메일: thdtjdgml415@gmail.com
- 배포경로 : https://main--delightful-tanuki-e5fef4.netlify.app/
- 레파지토리주소 : https://github.com/thdtjdgml415/wanted-pre-onboarding-frontend
```

## 주요 기능

1. 로그인
   > - 이메일과 비밀번호 유효성 검사 진행(이메일 조건 : @ 포함, 비밀번호 조건 : 8자리 이상)
   > - 유효성 검사 통과시 로그인 버튼 활성화
   > - 로그인 완료시 /todo 페이지로 이동
2. 회원가입
   > - 로그인과 마찬가지로 이메일과 비밀번호 유효성 검사진행
   > - 유효성 검사 통과시 회원가입 버튼 활성화
   > - 회원가입 완료시 /signin 로그인 페이지로 이동
3. Todo
   > - /todo 페이지 경로로 접속하면 로그인 토큰이 로컬 스토리지에 존재하면 투두리스트 목록 확인 가능 존재하지 않으면 로그인 페이지 리다이렉션
   > - 투두리스트 개별 수정 삭제버튼 존재하고 수정버튼 클릭시 수정모드
   > - 수정 input에 입력하고 제출 버튼 클릭시 내용 수정
   > - 완료 표시 클릭시 반영 새로고침해도 유지
   > - 삭제버튼 클릭시 리스트 삭제

## 설치 및 실행 방법

1. Git 리포지토리를 클론합니다.

   ```
   git clone https://github.com/thdtjdgml415/wanted-pre-onboarding-frontend.git
   ```

2. 필요한 npm 패키지를 설치합니다.

   ```
   npm install
   ```

3. 프로젝트를 실행합니다.

   ```
   npm start
   ```

이제 http://localhost:3000 에서 프로젝트를 확인할 수 있습니다.

## 기술 스택

- React.js
- axios
- SCSS
- react-router-dom

## 프로젝트 구조

```bash
src
├──assets: scss 스타일 관련 페이지
│├──button.scss : 버튼 공통 스타일코드
│├──join.scss : 회원가입 관련 스타일코드
│├──login.scss : 로그인 관련 스타일코드
│├──main.scss : 메인화면 관련 스타일코드
│├──mixin.scss : scss 에서 사용가능한 mixin 코드를 모아놓은 파일
│├──todo.scss : Todo관련 스타일코드
│├──reset.scss : 개발초기 스타일주기 전 모든 기본스타일 초기화
│├──style.scss : scss 파일을 한곳에 모아 index.js 파일에 style.scss 임포트
├──components: 재사용 가능한 컴포넌트
│├──atom : 재사용 가능한 컴포넌트 가장 작은 단위
├──pages : 페이지 단위
│├──Join : 회원가입 페이지
│├──Login : 로그인 페이지
│├──Main : 메인 페이지
│├──Todo : Todo리스트 페이지
├──api: API 호출 관련 코드
│├──client : api관련 axios 관련 기본 설정
```
