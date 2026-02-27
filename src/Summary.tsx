interface SummaryProps {
  checked: false;
}
function Summary({ checked }: SummaryProps) {
  return (
    <div>
      {checked ? <p>알림을 받습니다.</p> : <p>알림을 받지 않습니다.</p>}
    </div>
  );
}

export default Summary;
