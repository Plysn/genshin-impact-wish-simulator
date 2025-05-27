import './selectList.css';

interface Props {
  setIsHistoryOpen: (open: boolean) => void;
}

export default function SelectList({ setIsHistoryOpen }: Props) {
  return (
    <div className="select-list z-10 w-full">
      <button className="item">1</button>
      <button className="item">1</button>
      <button className="item">1</button>
    </div>
  );
}
