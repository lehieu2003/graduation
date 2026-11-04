import { useEffect, useMemo, useState } from 'react'
import { buildGoogleCalendarUrl, getCountdown } from './inviteUtils.js'

const INVITE = {
  issueNo: 'ẤN PHẨM ĐẶC BIỆT · N° 01 / 2026',
  name: 'Lê Hiếu',
  degree: 'Tân Kỹ Sư',
  university: 'Trường Đại học Quốc tế — ĐHQG TP.HCM',
  universityShort: 'HCMIU · VNU-HCM',
  portrait: '/portrait.jpg',
  leadLetter:
    'Vậy là chặng đường đại học tại Trường Đại học Quốc tế đã chính thức khép lại bằng tấm bằng Kỹ sư trên tay. Nhìn lại những năm tháng vừa qua, điều đáng giá nhất không chỉ là ngày nhận bằng, mà là những người bạn đã cùng đồng hành qua từng học kỳ, từng đồ án thức trắng đêm.',
  secondParagraph:
    'Nhân dịp lễ trao bằng chính thức vào chiều Chủ nhật ngày 29 tháng 11 tới đây (13:00 – 16:45) tại Hội trường Trần Chí Đáo, Hiếu trân trọng thân mời tất cả anh em, bạn bè ghé trường chung vui và lưu lại cùng nhau những bức hình kỷ niệm thật trọn vẹn.',
  startIso: '2026-11-29T13:00:00+07:00',
  calendarStartIso: '2026-11-29T12:00:00+07:00',
  endIso: '2026-11-29T17:30:00+07:00',
  dateDisplay: '29 . 11 . 2026',
  weekdayDisplay: 'Chiều Chủ nhật, Tháng 11 năm 2026',
  photoWindows: ['12:00 — 12:50', '16:45 — 17:30'],
  venue: 'Hội trường Trần Chí Đáo',
  campusArea: 'Nhà Điều hành ĐHQG-HCM, Phường Linh Xuân',
  address: 'VQ9W+JFG, Linh Xuân, TP. Hồ Chí Minh, Việt Nam',
  plusCode: 'VQ9W+JFG · LINH XUÂN, TP.HCM',
  mapQuery: 'Hội trường Trần Chí Đáo, VQ9W+JFG, Linh Xuân, Hồ Chí Minh, Việt Nam',
  phone: '0868 296 322',
  phoneRaw: '0868296322',
  dressCodeTitle: 'Trắng · Kem · Đen',
  dressCodeNote: 'Gam màu trung tính tối giản giúp khung hình tập thể nổi bật cạnh sắc đỏ – xanh của lễ phục.',
  parkingNote:
    'Hội trường Trần Chí Đáo nằm trong khuôn viên Nhà Điều hành ĐHQG-HCM. Bạn có thể đặt xe công nghệ đi thẳng vào sảnh chính hoặc gửi xe máy tại bãi giữ xe cổng Nhà Điều hành.',
  message:
    'Thân mời bạn ghé Hội trường Trần Chí Đáo (ĐHQG-HCM) chiều Chủ nhật 29/11/2026 chung vui tốt nghiệp cùng Tân Kỹ Sư Lê Hiếu. Khung giờ đón bạn bè & chụp hình: 12:00–12:50 (trước lễ) hoặc 16:45–17:30 (ngay sau lễ; nghi thức trong hội trường từ 13:00 đến 16:45).',
  schedule: [
    {
      index: '01',
      time: '12:00–12:50',
      label: 'ĐÓN BẠN BÈ ĐỢT 1 — TRƯỚC GIỜ VÀO LỄ',
      title: 'Gặp gỡ & Chụp ảnh kỷ niệm đầu giờ chiều',
      desc: 'Khung giờ nắng đẹp, thong thả ngoài tiền sảnh trước khi Tân Kỹ sư tập trung vào hội trường lúc 13:00.',
      featured: true,
    },
    {
      index: '02',
      time: '13:00–16:45',
      label: 'CHƯƠNG TRÌNH CHÍNH THỨC TRONG HỘI TRƯỜNG',
      title: 'Khai mạc, Vinh danh & Trao bằng Kỹ sư',
      desc: '13:00 đón khách & ổn định chỗ ngồi · 13:30 ca nhạc chào mừng · 14:00 chào cờ, phát biểu & vinh danh Thủ khoa · 15:05–16:40 trao bằng tốt nghiệp · 16:40 kết nạp Hội cựu sinh viên & kết thúc lúc 16:45. (Bạn bè tránh đến giữa khung giờ này để không phải chờ bên ngoài).',
      featured: false,
    },
    {
      index: '03',
      time: '16:45–17:30',
      label: 'ĐÓN BẠN BÈ ĐỢT 2 — NGAY SAU LỄ',
      title: 'Chung vui & Chụp hình cùng tấm Bằng Kỹ sư',
      desc: 'Ngay khi hội trường bế mạc lúc 16:45, hẹn gặp nhau tại sảnh chính và khuôn viên cây xanh trước khi trời tối.',
      featured: true,
    },
    {
      index: '04',
      time: '18:00',
      label: 'TIỆC THÂN MẬT SAU LỄ',
      title: 'Bữa tối chung vui cùng anh em thân thiết',
      desc: 'Ngồi lại trò chuyện thảnh thơi sau buổi lễ. Nếu bạn sắp xếp tham dự cùng được, hãy nhắn trước cho Hiếu qua Zalo nhé.',
      featured: false,
    },
  ],
}

export default function App() {
  const [countdown, setCountdown] = useState(() => getCountdown(INVITE.startIso))
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setCountdown(getCountdown(INVITE.startIso)), 1000)
    return () => clearInterval(id)
  }, [])

  const calendarUrl = useMemo(
    () => buildGoogleCalendarUrl({ ...INVITE, startIso: INVITE.calendarStartIso }),
    [],
  )
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(INVITE.mapQuery)}`
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(INVITE.mapQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`
  const zaloUrl = `https://zalo.me/${INVITE.phoneRaw}`

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({
        title: `Chuyên San Tốt Nghiệp — ${INVITE.degree} ${INVITE.name}`,
        text: INVITE.message,
        url: window.location.href,
      }).catch(() => {})
      return
    }
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div className="paper-canvas">
      {/* LỚP HẠT GIẤY IN CỔ ĐIỂN */}
      <svg className="paper-grain" aria-hidden="true">
        <filter id="editorial-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#editorial-noise)" />
      </svg>

      <div className="broadsheet">
        {/* MASTHEAD ĐẦU BÁO */}
        <header className="masthead">
          <div className="masthead-meta">
            <span>{INVITE.issueNo}</span>
            <span className="meta-center">{INVITE.universityShort}</span>
            <span>CHIỀU CHỦ NHẬT — {INVITE.dateDisplay}</span>
          </div>

          <div className="masthead-title-block">
            <p className="masthead-subkicker">THƯ BÁO TIN VUI &amp; LỜI MỜI CHUNG VUI</p>
            <h1 className="masthead-wordmark">THE GRADUATION GAZETTE</h1>
          </div>

          {/* DẢI CHỮ CHẠY NGANG MẢNH */}
          <div className="ticker-bar" aria-hidden="true">
            <div className="ticker-track">
              <span>
                TÂN KỸ SƯ LÊ HIẾU — TRƯỜNG ĐẠI HỌC QUỐC TẾ (ĐHQG-HCM) &nbsp;—&nbsp; CHIỀU CHỦ NHẬT 29.11.2026 &nbsp;—&nbsp; HỘI TRƯỜNG TRẦN CHÍ ĐÁO &nbsp;—&nbsp; ĐÓN BẠN BÈ: 12:00–12:50 &amp; 16:45–17:30 &nbsp;—&nbsp;
              </span>
              <span>
                TÂN KỸ SƯ LÊ HIẾU — TRƯỜNG ĐẠI HỌC QUỐC TẾ (ĐHQG-HCM) &nbsp;—&nbsp; CHIỀU CHỦ NHẬT 29.11.2026 &nbsp;—&nbsp; HỘI TRƯỜNG TRẦN CHÍ ĐÁO &nbsp;—&nbsp; ĐÓN BẠN BÈ: 12:00–12:50 &amp; 16:45–17:30 &nbsp;—&nbsp;
              </span>
            </div>
          </div>
        </header>

        {/* TRANG NHẤT BẤT ĐỐI XỨNG: BÀI VIẾT CHÍNH (TRÁI) & CHÂN DUNG BÌA (PHẢI) */}
        <section className="lead-spread">
          <div className="lead-article">
            <div className="article-kicker-row">
              <span className="vermilion-tag">CHUYÊN MỤC CHÍNH</span>
              <span className="mono-caption">BẰNG KỸ SƯ ĐẠI HỌC · NIÊN KHÓA 2026</span>
            </div>

            <h2 className="editorial-headline">
              Khép lại năm tháng giảng đường,
              <br />
              <em>hẹn bạn trong một khung hình.</em>
            </h2>

            <div className="byline-strip">
              <div>
                <span className="mono-label">NHÂN VẬT</span>
                <strong>{INVITE.degree} {INVITE.name}</strong>
              </div>
              <div>
                <span className="mono-label">ĐƠN VỊ ĐÀO TẠO</span>
                <strong>{INVITE.university}</strong>
              </div>
            </div>

            <div className="editorial-prose">
              <p className="dropcap-paragraph">{INVITE.leadLetter}</p>
              <p>{INVITE.secondParagraph}</p>
            </div>

            {/* CHỮ KÝ & DẤU MỘC ĐỎ ĐÓNG TRÊN GIẤY */}
            <div className="signoff-row">
              <div className="signoff-text">
                <span className="mono-label">THÂN MỜI TẤT CẢ BẠN BÈ,</span>
                <p className="signature-serif">{INVITE.name}</p>
              </div>

              <div className="ink-stamp" aria-hidden="true">
                <div className="ink-stamp-inner">
                  <span>ĐÃ TỐT NGHIỆP</span>
                  <strong>KỸ SƯ · 2026</strong>
                  <span>{INVITE.dateDisplay}</span>
                </div>
              </div>
            </div>

            {/* ĐỒNG HỒ ĐẾM NGƯỢC KIỂU BẢNG SỐ IN ẤN */}
            <div className="countdown-ledger" aria-label="Thời gian đếm ngược tới lễ tốt nghiệp">
              <div className="ledger-caption">
                <span className="mono-label">ĐẾM NGƯỢC TỚI GIỜ LỄ</span>
                <span className="mono-label vermilion-ink">29.11.2026 / 13:00 ICT</span>
              </div>

              {countdown ? (
                <div className="countdown-cells">
                  {[
                    ['NGÀY', countdown.days],
                    ['GIỜ', countdown.hours],
                    ['PHÚT', countdown.minutes],
                    ['GIÂY', countdown.seconds],
                  ].map(([unit, val]) => (
                    <div key={unit} className="countdown-cell">
                      <strong>{String(val).padStart(2, '0')}</strong>
                      <span>{unit}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="ceremony-live-notice">
                  HÔM NAY LÀ NGÀY LỄ CHÍNH THỨC — HẸN GẶP BẠN TẠI HỘI TRƯỜNG TRẦN CHÍ ĐÁO.
                </p>
              )}
            </div>

            {/* NÚT HÀNH ĐỘNG SẮC CẠNH */}
            <div className="editorial-actions">
              <a href={calendarUrl} target="_blank" rel="noreferrer" className="ink-btn solid">
                LƯU VÀO LỊCH GOOGLE <span aria-hidden="true">↗</span>
              </a>
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="ink-btn">
                CHỈ ĐƯỜNG BẢN ĐỒ <span aria-hidden="true">↗</span>
              </a>
              <a href={`tel:${INVITE.phoneRaw}`} className="ink-btn">
                GỌI {INVITE.phone}
              </a>
            </div>
          </div>

          {/* CỘT PHẢI: TẤM ẢNH CHÂN DUNG ĐÓNG KHUNG TẠP CHÍ */}
          <aside className="feature-plate">
            <div className="plate-header">
              <span className="mono-label">PLATE N° 01</span>
              <span className="mono-label">PORTRAIT ARCHIVE</span>
            </div>

            <figure className="portrait-figure">
              <div className="portrait-mat">
                <img
                  src={INVITE.portrait}
                  alt={`Chân dung tốt nghiệp của ${INVITE.degree} ${INVITE.name}`}
                />
              </div>
              <span className="vertical-marginalia" aria-hidden="true">
                BACHELOR OF ENGINEERING — INTERNATIONAL UNIVERSITY — 2026
              </span>
            </figure>

            <figcaption className="plate-caption">
              <span className="caption-index">HÌNH 01.</span> {INVITE.name} trong lễ phục tốt nghiệp cùng tấm Bằng Kỹ sư đỏ. Bức hình tiếp theo đang chờ sự góp mặt của bạn vào chiều Chủ nhật 29/11 tại Hội trường Trần Chí Đáo.
            </figcaption>
          </aside>
        </section>

        {/* BẢNG THÔNG CÁO 4 CỘT ĐƯỜNG KẺ 1PX */}
        <section className="facts-strip" aria-label="Thông tin cốt lõi">
          <article className="fact-cell">
            <span className="fact-roman">I. NGÀY TỔ CHỨC</span>
            <h3>{INVITE.dateDisplay}</h3>
            <p>{INVITE.weekdayDisplay}</p>
          </article>

          <article className="fact-cell is-accent">
            <span className="fact-roman">II. GIỜ ĐÓN BẠN BÈ</span>
            <h3>
              {INVITE.photoWindows[0]}
              <br />
              {INVITE.photoWindows[1]}
            </h3>
            <p>Linh hoạt 2 đợt: trước giờ vào hội trường (13:00) hoặc ngay khi lễ bế mạc (16:45).</p>
          </article>

          <article className="fact-cell">
            <span className="fact-roman">III. ĐỊA ĐIỂM HẸN</span>
            <h3>{INVITE.venue}</h3>
            <p>{INVITE.campusArea}</p>
          </article>

          <article className="fact-cell">
            <span className="fact-roman">IV. GỢI Ý TRANG PHỤC</span>
            <h3>{INVITE.dressCodeTitle}</h3>
            <p>{INVITE.dressCodeNote}</p>
          </article>
        </section>

        {/* CHUYÊN MỤC DƯỚI: LỊCH TRÌNH CHI TIẾT & BẢN ĐỒ ĐỊNH VỊ */}
        <section className="lower-spread">
          <div id="schedule" className="programme-column">
            <div className="section-rule-head">
              <span className="mono-label">MỤC A — CHƯƠNG TRÌNH TRONG NGÀY</span>
              <h2>Lịch trình đón tiếp</h2>
            </div>

            <ol className="editorial-schedule">
              {INVITE.schedule.map((item) => (
                <li key={item.index} className={item.featured ? 'schedule-item featured' : 'schedule-item'}>
                  <div className="schedule-num-col">
                    <span className="big-index">{item.index}</span>
                    <time className="mono-time">{item.time}</time>
                  </div>

                  <div className="schedule-body-col">
                    <span className="schedule-kicker">{item.label}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="editors-note">
              <span className="mono-label">GHI CHÚ LƯU THÔNG &amp; GỬI XE</span>
              <p>{INVITE.parkingNote}</p>
            </div>
          </div>

          <div id="location" className="cartography-column">
            <div className="section-rule-head">
              <span className="mono-label">MỤC B — BẢN ĐỒ &amp; LIÊN LẠC TRỰC TIẾP</span>
              <h2>Định vị hội trường</h2>
            </div>

            <div className="map-editorial-box">
              <div className="map-coord-bar">
                <span>{INVITE.venue.toUpperCase()}</span>
                <span>{INVITE.plusCode}</span>
              </div>
              <div className="map-viewport">
                <iframe
                  title="Bản đồ Hội trường Trần Chí Đáo"
                  src={mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="map-hint">
                Địa chỉ đầy đủ: {INVITE.address} (Di chuột hoặc chạm vào bản đồ để xem chi tiết màu).
              </p>
            </div>

            <div className="dispatch-ledger">
              <div className="dispatch-phone-block">
                <span className="mono-label">ĐIỆN THOẠI LIÊN HỆ KHI TỚI CỔNG</span>
                <a href={`tel:${INVITE.phoneRaw}`} className="giant-phone">
                  {INVITE.phone}
                </a>
                <div className="dispatch-sublinks">
                  <a href={zaloUrl} target="_blank" rel="noreferrer">
                    Nhắn qua Zalo ({INVITE.phoneRaw}) ↗
                  </a>
                  <a href={mapsUrl} target="_blank" rel="noreferrer">
                    Mở ứng dụng Google Maps ↗
                  </a>
                </div>
              </div>

              <button type="button" className="share-stamp-btn" onClick={handleShare}>
                {copied ? 'ĐÃ SAO CHÉP ĐƯỜNG DẪN' : 'CHIA SẺ ẤN PHẨM NÀY ↗'}
              </button>
            </div>
          </div>
        </section>

        {/* CHÂN TRANG XUẤT BẢN (COLOPHON) */}
        <footer className="colophon">
          <div className="colophon-inner">
            <span>CHUYÊN SAN KỶ NIỆM TỐT NGHIỆP — {INVITE.degree.toUpperCase()} {INVITE.name.toUpperCase()}</span>
            <span>TRƯỜNG ĐẠI HỌC QUỐC TẾ (ĐHQG-HCM)</span>
            <span>HẸN GẶP LẠI CHIỀU {INVITE.dateDisplay}</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
