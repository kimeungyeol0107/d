import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firestore 인스턴스 생성
const db = getFirestore();

// 사용자 잔액을 Firestore에 저장하는 함수
const storeUserData = async (user) => {
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      email: user.email,
      balance: 1000 // 예시로 1000 코인 부여
    });
    console.log("사용자 데이터 Firestore에 저장됨");
  } catch (error) {
    console.error("Firestore 저장 실패:", error.message);
  }
};

// 구글 로그인 후 Firestore에 사용자 데이터 저장
const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // 사용자 데이터 Firestore에 저장
    storeUserData(user);

    // 사용자 이메일 표시
    document.getElementById("user-email").innerText = user.email;
    
    // 잔액 표시 (예시로 1000 코인)
    document.getElementById("user-balance").innerText = "1000";

    document.getElementById("user-info").style.display = "block";
    console.log("로그인 성공:", user);
  } catch (error) {
    console.error("로그인 실패:", error.message);
    alert("로그인 실패: " + error.message);
  }
};
