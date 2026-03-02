interface CheckboxProps {
  checked: false;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

function Checkbox({ checked, setChecked }: CheckboxProps) {
  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
        }}
      />
      <label>알림받기</label>
    </div>
  );
}

export default Checkbox;
