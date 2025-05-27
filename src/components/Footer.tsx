import './homePage.css';

interface Props {
  setIsHistoryOpen: (open: boolean) => void;
}

export default function Footer({ setIsHistoryOpen }: Props) {
  return (
    <div className="footer relative z-10 w-full flex gap-12 items-center">
      <button className="svelte-btn" onClick={() => setIsHistoryOpen(true)}>
        Lịch sử
      </button>
      <div className="right">
        <button className="wish-btn single">
          <div className="top">Cầu Nguyện ×1</div>
          <div className="bottom">
            <img src="/assets/images/icon/intertwined-fate.webp" alt="" />
            <span>x 1</span>
          </div>
        </button>
        <button className="wish-btn ten">
          <div className="top">Cầu Nguyện ×10</div>
          <div className="bottom">
            <img src="/assets/images/icon/intertwined-fate.webp" alt="" />
            <span>x 10</span>
          </div>
        </button>
      </div>
    </div>
  );
}
