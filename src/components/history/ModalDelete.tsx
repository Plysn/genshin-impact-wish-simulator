import { useState } from 'react';
import './modalDelete.css';
import { useHistory } from '@/hooks/useHistory';

interface Props {
  setOpenDeleteModal: (open: boolean) => void;
  banner: {
    value: string;
    label: string;
  };
}

const DeleteHistoryModal = ({ setOpenDeleteModal, banner }: Props) => {
  const [dontReset, setDontReset] = useState(false);
  const { deleteHistoryByBanner } = useHistory();

  return (
    <div className="bg-[url('/assets/images/backgrounds/modal-bg.png')] modal-delete border border-[#c6a96f] rounded-md shadow-xl w-[500px] p-6 relative font-sans">
      <span className="corner top-right"></span>
      <span className="corner top-left"></span>
      <span className="corner bottom-right"></span>
      <span className="corner bottom-left"></span>
      <div className="container">
        <h2 className="pop-header">Xoá Lịch Sử ?</h2>

        <p className="text-[#383b40] text-[18px] text-center leading-relaxed mb-4">
          Điều này cũng xoá tất cả vũ khí và nhân vật liên quan
          <br />
          đến Banner <span className="font-bold">{banner.label}</span> ở trong
          <br />
          túi đồ của bạn.
          <br />
          Bạn có chắc muốn xoá lịch sử không ?
        </p>

        <div className="flex items-center justify-center mb-10">
          <input
            type="checkbox"
            id="dont-reset"
            checked={dontReset}
            onChange={() => setDontReset(!dontReset)}
            className="mr-2 scale-150"
          />
          <label htmlFor="dont-reset" className="text-[15px] text-[#3a2d1f]">
            Don’t reset Pity and Guaranteed Status
          </label>
        </div>

        <div className="flex justify-between footer-modal">
          <button
            className="button-confirm"
            onClick={() => setOpenDeleteModal(false)}
          >
            <i className="gi gi-times"></i>
            Hủy
          </button>

          <button
            className="button-confirm"
            onClick={() => {
              if (!dontReset) {
                deleteHistoryByBanner(banner.value);
              }
              setOpenDeleteModal(false);
            }}
          >
            <i className="gi gi-circle-o"></i>
            Xác Nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteHistoryModal;
