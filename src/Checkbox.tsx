interface CheckboxProps {
  checked: false;
  handleCheck: () => void;
}

function Checkbox({ checked, handleCheck }: CheckboxProps) {
  return (
    <div>
      <input type="checkbox" checked={checked} onChange={handleCheck} />
      <label>알림받기</label>
    </div>
  );
}

export default Checkbox;
