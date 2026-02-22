//이 미션의 목표는 직접 수정(❌) 과 새 객체 복사 후 교체(✅) 의 차이를 눈으로 확인하고,
/**
 * 
 * @returns 
 * # ❌ 잘못된 코드 (user.age += 1)
철수 — 20살
[버튼 클릭]
→ 변화 없음
[버튼 다시 클릭]
→ 철수 — 22살 (두 칸 올라감 ❌)

# ✅ 올바른 코드 (불변성 유지)
철수 — 20살
[버튼 클릭]
→ 철수 — 21살
[버튼 다시 클릭]
→ 철수 — 22살
프로필에 도시 정보 추가하기
city: "서울" 속성을 추가하고,
“도시 변경하기” 버튼을 눌렀을 때 새로운 도시 이름으로 업데이트되도록 만들어보세요.
setUser({ ...user, city: "부산" });
배열 형태의 객체 업데이트 연습하기
여러 명의 유저를 배열로 관리하고,
특정 유저의 나이만 업데이트하도록 map()을 활용해 보세요.

 */

import { useState } from "react";

function Profile() {
  const [wrongProfile, setWrongProfile] = useState({
    name: "철수",
    age: 20,
  });

  const [correctProfile, setCorrectProfile] = useState({
    name: "철수",
    age: 20,
  });
  const handleWrongProfile = () => {
    // 기존 객체를 수정해서 그대로 넣기
    wrongProfile.age += 1;
    setWrongProfile(wrongProfile);
  };
  const handleCorrectProfile = () => {
    setCorrectProfile({
      ...correctProfile,
      age: correctProfile.age + 1,
    });
  };
  return (
    <div>
      <div>
        <p>
          이름:{wrongProfile.name} - {wrongProfile.age}
        </p>
        <button onClick={handleWrongProfile}>잘못된 버튼</button>
      </div>
      <div>
        <p>
          이름:{correctProfile.name} - {correctProfile.age}
        </p>
        <button onClick={handleCorrectProfile}>올바른 버튼</button>
      </div>
    </div>
  );
}

export default Profile;
