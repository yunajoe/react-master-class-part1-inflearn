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
    <div style={{ border: "5px solid #8B98A3", padding: "6px" }}>
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
