import { useState } from "react";

const InitData = {
  name: "영희",
  age: 25,
  address: { city: "서울", zipcode: "12345" },
};
function User() {
  const [userInfo, setUserInfo] = useState(InitData);
  const handleCityChange = () => {
    setUserInfo((prev) => ({
      ...prev,
      address: { ...prev.address, city: "부산" },
    }));
  };

  const handleZipCodeChange = () => {
    setUserInfo((prev) => ({
      ...prev,
      address: { ...prev.address, zipcode: "54321" },
    }));
  };
  const handleReset = () => {
    setUserInfo(InitData);
  };
  return (
    <div style={{ border: "5px solid #8B98A3", padding: "6px" }}>
      <p>
        {userInfo.name} - {userInfo.address.city} ({userInfo.address.zipcode})
      </p>
      <button onClick={handleCityChange}>도시변경하기</button>
      <button onClick={handleZipCodeChange}>zipcode 변경하기</button>
      <button onClick={handleReset}>리셋버튼</button>
    </div>
  );
}

export default User;
