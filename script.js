// Firebase SDK 가져오기
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";

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

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);  // Firebase Analytics 추가
const auth = getAuth(app);
const db = getDatabase(app);

// 로그인 함수
const loginWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    document.getElementById("user-email").innerText = user.email;

    // 로그인된 사용자의 잔액을 가져와서 표시
    const balanceRef = ref(db, 'balances/' + user.uid);
    const snapshot = await get(balanceRef);
    if (snapshot.exists()) {
      document.getElementById("balance").innerText = snapshot.val();
    } else {
      document.getElementById("balance").innerText = 0; // 잔액이 없을 경우 0 표시
    }

    // 로그인 후 사용자 정보를 보여주기
    document.getElementById("user-info").style.display = "block";

    // 만약 관리자인 "gimeungyeol5@gmail.com"로 로그인했다면, 관리 기능 활성화
    if (user.email === "gimeungyeol5@gmail.com") {
      document.getElementById("admin-section").style.display = "block";
    }

  } catch (error) {
    alert(error.message);
  }
};

// 로그아웃 함수
const logout = () => {
  signOut(auth).then(() => {
    document.getElementById("user-info").style.display = "none";
  }).catch((error) => {
    alert(error.message);
  });
};

// 잔액 보기 버튼 클릭 시
const viewBalance = async () => {
  const targetEmail = document.getElementById("target-email").value;
  
  // 이메일에 해당하는 사용자 UID를 가져오고 잔액을 조회
  const usersRef = ref(db, 'users/');
  const snapshot = await get(usersRef);
  let targetBalance = '이메일을 찾을 수 없습니다.';
  snapshot.forEach(childSnapshot => {
    if (childSnapshot.val().email === targetEmail) {
      const targetBalanceRef = ref(db, 'balances/' + childSnapshot.key);
      get(targetBalanceRef).then(targetSnapshot => {
        targetBalance = targetSnapshot.val() || '잔액 없음';
        document.getElementById("target-balance").innerText = `${targetEmail}의 잔액: ${targetBalance} 원`;
      });
    }
  });
  document.getElementById("target-balance").innerText = targetBalance;
};

// 이벤트 리스너 설정
document.getElementById("login-btn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  loginWithEmailPassword(email, password);
});

document.getElementById("logout-btn").addEventListener("click", logout);

document.getElementById("view-balance-btn").addEventListener("click", viewBalance);
