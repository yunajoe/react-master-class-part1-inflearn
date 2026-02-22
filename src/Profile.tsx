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

import { ChangeEvent, useState } from "react";

function Profile() {
  const [data, setData] = useState([
    {
      id: 1,
      name: "철수",
      age: 20,
      city: "서울",
    },
    {
      id: 2,
      name: "묭이",
      age: 25,
      city: "부산",
    },
    {
      id: 3,
      name: "뜌뜌",
      age: 30,
      city: "수원",
    },
    {
      id: 4,
      name: "영희",
      age: 20,
      city: "용산",
    },
  ]);
  const [newCityArr, setNewCityArr] = useState([
    { id: 1, city: "" },
    { id: 2, city: "" },
    { id: 3, city: "" },
    { id: 4, city: "" },
  ]);

  const handleIncreaseAge = (id: number) => {
    setData((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, age: item.age + 1 } : item,
      );
    });
  };

  const handleChangeCity = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
    targetId: number,
  ) => {
    setNewCityArr((prev) => {
      return prev.map((item) =>
        item.id === targetId ? { ...item, city: e.target.value } : item,
      );
    });
  };
  const handleUpdateCity = (targetId: number) => {
    const updateCityName = newCityArr.find(
      (item) => item.id === targetId,
    )?.city;
    if (!updateCityName) return;
    setData((prev) => {
      return prev.map((item) =>
        item.id === targetId ? { ...item, city: updateCityName } : item,
      );
    });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          {data.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                columnGap: "10px",
              }}
            >
              <p>이름: {item.name}</p>
              <p>나이: {item.age}</p>
              <p>도시: {item.city}</p>
              <button onClick={() => handleIncreaseAge(item.id)}>
                나이 증가 버튼
              </button>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {newCityArr.map((item) => (
            <div key={item.id} style={{ display: "flex", columnGap: "10px" }}>
              <input
                value={item.city}
                onChange={(e) => handleChangeCity(e, item.id)}
              />
              <button onClick={() => handleUpdateCity(item.id)}>
                도시업데이트
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
