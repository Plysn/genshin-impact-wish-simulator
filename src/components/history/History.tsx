import { useState } from 'react';
import './history.css';
import SelectList from './SelectList';

interface Props {
  setIsHistoryOpen: (open: boolean) => void;
}

interface HistoryItem {
  damage: number | string;
  type: string;
  name: string;
  date: string;
  banner: string;
}

export default function History({ setIsHistoryOpen }: Props) {
  const [isShowSeclect, setIsShowSelect] = useState(false);
  const [historyData] = useState<HistoryItem[]>([
    {
      damage: 12,
      type: 'Vũ khí',
      name: 'Kiếm Thiên Không',
      date: '2024-06-01 12:00',
      banner: 'Banner 1'
    },
    {
      damage: 1,
      type: 'Nhân vật',
      name: 'Diluc',
      date: '2024-06-02 13:00',
      banner: 'Banner 2'
    },
    {
      damage: 12,
      type: 'Vũ khí',
      name: 'Kiếm Thiên Không',
      date: '2024-06-01 12:00',
      banner: 'Banner 1'
    },
    {
      damage: 1,
      type: 'Nhân vật',
      name: 'Diluc',
      date: '2024-06-02 13:00',
      banner: 'Banner 2'
    },
    {
      damage: 12,
      type: 'Vũ khí',
      name: 'Kiếm Thiên Không',
      date: '2024-06-01 12:00',
      banner: 'Banner 1'
    },
    {
      damage: 1,
      type: 'Nhân vật',
      name: 'Diluc',
      date: '2024-06-02 13:00',
      banner: 'Banner 2'
    },
    {
      damage: 12,
      type: 'Vũ khí',
      name: 'Kiếm Thiên Không',
      date: '2024-06-01 12:00',
      banner: 'Banner 1'
    },
    {
      damage: 1,
      type: 'Nhân vật',
      name: 'Diluc',
      date: '2024-06-02 13:00',
      banner: 'Banner 2'
    },
    {
      damage: 12,
      type: 'Vũ khí',
      name: 'Kiếm Thiên Không',
      date: '2024-06-01 12:00',
      banner: 'Banner 1'
    },
    {
      damage: 12,
      type: 'Vũ khí',
      name: 'Kiếm Thiên Không',
      date: '2024-06-01 12:00',
      banner: 'Banner 1'
    },
    {
      damage: 1,
      type: 'Nhân vật',
      name: 'Diluc',
      date: '2024-06-02 13:00',
      banner: 'Banner 2'
    },
    {
      damage: 12,
      type: 'Vũ khí',
      name: 'Kiếm Thiên Không',
      date: '2024-06-01 12:00',
      banner: 'Banner 1'
    },
    {
      damage: 1,
      type: 'Nhân vật',
      name: 'Diluc',
      date: '2024-06-02 13:00',
      banner: 'Banner 2'
    },
    {
      damage: 12,
      type: 'Vũ khí',
      name: 'Kiếm Thiên Không',
      date: '2024-06-01 12:00',
      banner: 'Banner 1'
    },
    {
      damage: 1,
      type: 'Nhân vật',
      name: 'Diluc',
      date: '2024-06-02 13:00',
      banner: 'Banner 2'
    },
    {
      damage: 12,
      type: 'Vũ khí',
      name: 'Kiếm Thiên Không',
      date: '2024-06-01 12:00',
      banner: 'Banner 1'
    },
    {
      damage: 1,
      type: 'Nhân vật',
      name: 'Diluc',
      date: '2024-06-02 13:00',
      banner: 'Banner 2'
    }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(historyData.length / itemsPerPage);

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
              <span>Su kien cau nguyen nhan vat</span>
              <img
                src="/assets/images/icon/arrow.png"
                alt="arrow"
                style={{
                  transform: isShowSeclect ? 'rotate(0deg)' : 'rotate(180deg)',
                  width: 20,
                  height: 10
                }}
              />
              <SelectList setIsHistoryOpen={setIsHistoryOpen} />
            </div>
          </div>
          <div className="reset">
            <i className="gi gi-delete"></i>
            <span>Xoa Lich Su</span>
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
              Tổn hại hiện tại : <span className="star5">12</span> -{' '}
              <span className="star4">1</span>
            </div>
            <div>
              <span>Tổng Số Lượng : </span>
              <span className="star4">12</span>
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
          <div className="table-filter svelte-col-span-3">
            <span className="filter-label">Lọc:</span>
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
            {historyData &&
              historyData
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.damage}</td>
                    <td>{item.type}</td>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{item.banner}</td>
                  </tr>
                ))}
            {historyData.length === 0 && (
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
    </div>
  );
}
