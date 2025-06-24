import { useBannerStore } from '@/store/useBannerStore';
import { useContext, useMemo, useState } from 'react';
import './history.css';
import HistoryContext from './HistoryContext';
import DeleteHistoryModal from './ModalDelete';
import SelectList from './SelectList';

interface Props {
  setIsHistoryOpen: (open: boolean) => void;
}

const listStars = [
  { value: 'all', label: 'Tất Cả' },
  { value: '5', label: '5 Sao' },
  { value: '4', label: '4 Sao' },
  { value: '3', label: '3 Sao' }
];

export default function History({ setIsHistoryOpen }: Props) {
  const [isShowSeclect, setIsShowSelect] = useState(false);
  const [isShowSeclectStar, setIsShowSelectStar] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(() => {
    return localStorage.getItem('selectedBanner') || 'character ';
  });
  const [selectStar, setSelectStar] = useState<string>(() => {
    return localStorage.getItem('selectedStar') || 'all';
  });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { historyList } = useContext(HistoryContext);

  const filteredHistoryList = useMemo(() => {
    return historyList.filter((item) => {
      const matchBanner = item.bannerType === selectedOption.trim();
      const matchStar =
        selectStar === 'all' ? true : item.rarity === Number(selectStar);
      return matchBanner && matchStar;
    });
  }, [historyList, selectedOption, selectStar]);
  const { banners } = useBannerStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredHistoryList.length / itemsPerPage);

  const totalPity = useMemo(() => {
    return filteredHistoryList.reduce(
      (sum, item) => sum + (item.pity > 1 ? item.pity : 0),
      0
    );
  }, [filteredHistoryList]);

  const bannerOptions = useMemo(
    () =>
      banners.map((banner) => ({
        value: banner.type,
        label: banner.name
      })),
    [banners]
  );

  return (
    <div className="history relative z-10 flex gap-12 items-center bg-[url('/assets/images/history/book.webp')]">
      <button
        className="close"
        onClick={() => setIsHistoryOpen(false)}
      ></button>
      <div className="book-content px-30 py-10">
        <div className="title">
          <img src="/assets/images/logo/brand.png" alt="Logo" />
          <h1 className="title">Lịch Sử Cầu Nguyện</h1>
        </div>
        <div className="selectType">
          <div className="wish-type bg-[url('/assets/images/history/history-select-bg.webp')]">
            <span className="select-type">Chọn loại Cầu Nguyện:</span>
            <div
              className="select-box"
              onClick={() => {
                setIsShowSelect(!isShowSeclect);
              }}
            >
              <span>
                {bannerOptions.find((option) => option.value === selectedOption)
                  ?.label || bannerOptions[0].label}
              </span>
              <img
                src="/assets/images/icon/arrow.png"
                alt="arrow"
                style={{
                  transform: isShowSeclect ? 'rotate(0deg)' : 'rotate(180deg)',
                  width: 20,
                  height: 10
                }}
              />
              {isShowSeclect && (
                <SelectList
                  type="banner"
                  setSelectedOption={setSelectedOption}
                  listOptions={bannerOptions}
                />
              )}
            </div>
          </div>
          <div className="reset">
            <i className="gi gi-delete"></i>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setOpenDeleteModal(true);
              }}
            >
              Xóa Lịch Sử
            </span>
          </div>
        </div>
        <div className="container">
          <span>
            Chúng tôi không bao giờ lưu trữ thông tin của bạn lên đám mây. Tất
            cả dữ liệu được lưu trữ ở IndexedDB, điều đó có nghĩa là tất cả dữ
            liệu của bạn được lưu ở trình duyệt. Nó sẽ không bao giờ bị xoá cho
            đến khi bạn xoá nó thủ công qua nút xoá/đặt lại hoặc nút xoá dữ liệu
            trình duyệt.
          </span>
        </div>
        <div className="svelte-info-row">
          <div className="svelte-col-span-3">
            <div>
              Tổn hại hiện tại :{' '}
              <span className="star5">{filteredHistoryList.length}</span> -{' '}
              <span className="star4">
                {filteredHistoryList.length - totalPity}
              </span>
            </div>
            <div>
              <span>Tổng Số Lượng : </span>
              <span className="star4">{filteredHistoryList.length}</span>
            </div>
          </div>
          <div className="svelte-col-span-3">
            <div className="flex">
              <span>Tiêu Tổng Cộng : </span>
              <span className="star4">12</span>
              <img src="/assets/images/icon/primogem.webp" alt="Logo" />
            </div>
            <div>
              <span>Est. </span>
              <span className="star4">12</span>
            </div>
          </div>
          <div>
            <div
              className="table-filter svelte-col-span-3"
              onClick={() => setIsShowSelectStar(!isShowSeclectStar)}
            >
              <span className="filter-label">
                Bộ Lọc /{' '}
                {
                  listStars.find((option) => option.value === selectStar)?.label
                }{' '}
              </span>
              {isShowSeclectStar && (
                <SelectList
                  type="star"
                  setSelectedOption={setSelectStar}
                  listOptions={listStars}
                />
              )}
              <i
                className={`gi ${isShowSeclectStar ? 'gi-caret-up' : 'gi-caret-down'} `}
              ></i>
            </div>
          </div>
        </div>
        <table className="history-table">
          <thead>
            <tr>
              <th>Tổn Hại</th>
              <th>Loại</th>
              <th>Tên</th>
              <th>Thời gian nhận được</th>
              <th>Banner</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistoryList &&
              filteredHistoryList
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, idx) => (
                  <tr key={idx}>
                    <td
                      style={{
                        color: item.rarity >= 4 ? '#a256e1' : ''
                      }}
                    >
                      {item.pity}
                    </td>
                    <td>{item.type}</td>
                    <td
                      style={{
                        color: item.rarity >= 4 ? '#a256e1' : ''
                      }}
                    >
                      {item.name}
                      {item.rarity >= 4 && <> ( {item.rarity}★ )</>}
                    </td>
                    <td>
                      {new Date(item.date).toLocaleString('vi-VN', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true
                      })}
                    </td>
                    <td style={{ color: '#dda04f' }}>
                      {banners.find((banner) => banner.type === item.bannerType)
                        ?.name || ''}
                    </td>
                  </tr>
                ))}
            {filteredHistoryList.length === 0 && (
              <tr>
                <td colSpan={5} className="no-data">
                  Không Có Dữ Liệu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="table-footer">
          <div className="legend">
            <span>
              <i className="gi gi-win"></i>: Thắng 50/50
            </span>
            <span>
              <i className="gi gi-lose"></i>: Thua 50/50
            </span>
            <span>
              <i className="gi gi-guaranteed "></i>: Được Đảm Bảo
            </span>
            <span>
              <i className="gi gi-captured"></i>: Capturing Radiance
            </span>
          </div>
          {totalPages > 1 && (
            <div className="pagination flex gap-2 justify-center mt-2 z-20">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="pagination-button"
              >
                <img
                  src="/assets/images/icon/arrow.png"
                  alt="arrow"
                  style={{
                    transform: 'rotate(-90deg)',
                    width: 20,
                    height: 10,
                    opacity: currentPage === 1 ? 0.3 : 1
                  }}
                />
              </button>
              <button className="active">{currentPage}</button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="pagination-button"
              >
                <img
                  src="/assets/images/icon/arrow.png"
                  alt="arrow"
                  style={{
                    transform: 'rotate(90deg)',
                    width: 20,
                    height: 10,
                    opacity: currentPage === totalPages ? 0.3 : 1
                  }}
                />
              </button>
            </div>
          )}
        </div>
      </div>
      {openDeleteModal && (
        <div className="reset-modal">
          <DeleteHistoryModal
            setOpenDeleteModal={setOpenDeleteModal}
            banner={
              bannerOptions.find((option) => option.value === selectedOption) ||
              bannerOptions[0]
            }
            star={Number(selectStar)}
          />
        </div>
      )}
    </div>
  );
}
