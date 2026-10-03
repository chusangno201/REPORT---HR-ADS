import React from "react";
import { Download, FileSpreadsheet } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, SectionTitle } from "../components/UI";
import { reportRows, sourceData } from "../data/mock";
import { money, pctDiff } from "../utils/format";

const format = (v, t) =>
  t === "money" ? money(v) : t === "percent" ? `${v}%` : v;
export default function Reports() {
  return (
    <div className="page-stack">
      <div className="toolbar">
        <div className="date-chip">01/09/2026 — 30/09/2026</div>
        <button className="btn secondary">
          <Download size={16} /> Xuất PDF
        </button>
        <button className="btn primary">
          <FileSpreadsheet size={16} /> Xuất Excel
        </button>
      </div>
      <Card>
        <SectionTitle
          title="Báo cáo điều hành tổng hợp"
          subtitle="So sánh kết quả, kỳ trước và mục tiêu"
        />
        <div className="report-table">
          <table>
            <thead>
              <tr>
                <th>Chỉ số</th>
                <th>Kỳ hiện tại</th>
                <th>Kỳ trước</th>
                <th>Thay đổi</th>
                <th>Mục tiêu</th>
                <th>Đánh giá</th>
              </tr>
            </thead>
            <tbody>
              {reportRows.map((r) => {
                const diff = pctDiff(r.current, r.previous);
                const reach = (r.current / r.target) * 100;
                return (
                  <tr key={r.metric}>
                    <td>
                      <b>{r.metric}</b>
                    </td>
                    <td>{format(r.current, r.type)}</td>
                    <td>{format(r.previous, r.type)}</td>
                    <td className={diff >= 0 ? "text-success" : "text-danger"}>
                      {diff >= 0 ? "+" : ""}
                      {diff.toFixed(1)}%
                    </td>
                    <td>{format(r.target, r.type)}</td>
                    <td>
                      <span
                        className={`status-dot ${reach >= 100 ? "ok" : reach >= 90 ? "warn" : "bad"}`}
                      />
                      {reach >= 100
                        ? "Đạt"
                        : reach >= 90
                          ? "Sát mục tiêu"
                          : "Cần cải thiện"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="dashboard-grid half-half">
        <Card>
          <SectionTitle
            title="Lead theo nguồn"
            subtitle="Tỷ trọng nguồn khách hàng"
          />
          <div className="chart-md">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#edf1ef"
                />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#0f8a67"
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <SectionTitle
            title="Bộ báo cáo có sẵn"
            subtitle="Các báo cáo nên có khi đưa vào vận hành"
          />
          <div className="report-links">
            <button>
              Báo cáo doanh thu theo Sale <span>→</span>
            </button>
            <button>
              Phễu Lead → Đặt lịch → Chốt <span>→</span>
            </button>
            <button>
              Lý do thắng / thua cơ hội <span>→</span>
            </button>
            <button>
              Năng suất chăm sóc khách hàng <span>→</span>
            </button>
            <button>
              Biến động nhân sự & nghỉ việc <span>→</span>
            </button>
            <button>
              Chi phí nhân sự / doanh thu <span>→</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
