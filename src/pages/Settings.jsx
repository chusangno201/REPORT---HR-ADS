import React from "react";
import { Badge, Card, SectionTitle } from "../components/UI";

const rows = [
  [
    "Phân quyền theo vai trò",
    "Admin, HR, Sales Manager, Sales, Kế toán",
    "Đã bật",
  ],
  ["Quy trình duyệt nghỉ phép", "Nhân viên → Trưởng bộ phận → HR", "Đã bật"],
  ["Ngưỡng cảnh báo KPI", "< 70% nghiêm trọng; < 80% cảnh báo", "Đã bật"],
  ["Lead chưa chăm sóc", "Cảnh báo sau 24h; nghiêm trọng sau 48h", "Đã bật"],
  ["Tích hợp Facebook/TikTok Lead", "Webhook/API", "Chưa kết nối"],
  ["Tích hợp chấm công", "Máy chấm công / mobile check-in", "Chưa kết nối"],
];

export default function Settings() {
  return (
    <div className="page-stack">
      <Card>
        <SectionTitle
          title="Thiết lập vận hành"
          subtitle="Các cấu hình nên hoàn thiện trước khi chạy thật"
        />
        <div className="settings-list">
          {rows.map(([a, b, c]) => (
            <div className="setting-row" key={a}>
              <div>
                <b>{a}</b>
                <p>{b}</p>
              </div>
              <Badge tone={c === "Đã bật" ? "success" : "warning"}>{c}</Badge>
              <button className="btn ghost">Cấu hình</button>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle title="Kiến trúc dữ liệu đề xuất" />
        <div className="architecture">
          <div>
            <b>HR Core</b>
            <span>Employee · Department · Contract · Leave · Attendance</span>
          </div>
          <i>→</i>
          <div>
            <b>Performance</b>
            <span>KPI · Review · Target · Bonus</span>
          </div>
          <i>↔</i>
          <div>
            <b>CRM</b>
            <span>Lead · Customer · Deal · Activity · Sales Target</span>
          </div>
          <i>→</i>
          <div>
            <b>BI Reports</b>
            <span>Dashboard · Alert · Forecast · Export</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
