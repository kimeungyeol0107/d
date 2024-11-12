// Firebase SDK import
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyD1Xz0ZYCOsauT2ga1awdSkh87IA8OMRiU",
  authDomain: "n00001-4ff1e.firebaseapp.com",
  projectId: "n00001-4ff1e",
  storageBucket: "n00001-4ff1e.firebasestorage.app",
  messagingSenderId: "575173293295",
  appId: "1:575173293295:web:4dbb1e44760dc3bcce171a",
  measurementId: "G-38JLDN4DJH"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase 인증 객체 생성
const auth = getAuth();

// 구글 로그인 처리
const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  
  try {
    // 구글 로그인 팝업
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // 사용자 이메일 표시
    document.getElementById("user-email").innerText = user.email;
    
    // 잔액을 표시 (예시로 1000 코인 부여)
    document.getElementById("user-balance").innerText = "1000";

    // 로그인 후 사용자 정보 표시
    document.getElementById("user-info").style.display = "block";
    
    console.log("로그인 성공:", user);
  } catch (error) {
    console.error("로그인 실패:", error.message);
    alert("로그인 실패: " + error.message);
  }
};

// Firebase에 구글 로그인 정보 저장 및 관리
const storeUserData = (user) => {
  // 예시로 Firebase Firestore를 사용하여 사용자 잔액 저장
  // Firestore 설정과 관련된 코드 추가 가능
};
