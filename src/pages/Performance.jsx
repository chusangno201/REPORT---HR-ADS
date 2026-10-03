import React from "react";
import { employees } from "../data/mock";
import { Badge, Card, Progress, SectionTitle } from "../components/UI";

export default function Performance() {
  return (
    <div className="page-stack">
      <div className="summary-strip">
        <div>
          <span>Nhân sự đạt KPI</span>
          <b>78%</b>
        </div>
        <div>
          <span>Xuất sắc ≥100%</span>
          <b>9 người</b>
        </div>
        <div>
          <span>Cần cải thiện &lt;80%</span>
          <b>5 người</b>
        </div>
        <div>
          <span>Đánh giá chờ duyệt</span>
          <b>7 phiếu</b>
        </div>
      </div>
      <Card>
        <SectionTitle
          title="Hiệu suất cá nhân"
          subtitle="Tổng hợp KPI công việc và kết quả kinh doanh"
          action={<button className="btn primary">Tạo kỳ đánh giá</button>}
        />
        <div className="performance-list">
          {employees.map((e) => (
            <div className="performance-row" key={e.id}>
              <div className="person-cell">
                <span className="avatar sm">{e.avatar}</span>
                <div>
                  <b>{e.name}</b>
                  <small>{e.role}</small>
                </div>
              </div>
              <div className="perf-progress">
                <Progress value={e.kpi} max={120} />
              </div>
              <b className="perf-num">{e.kpi}%</b>
              <Badge
                tone={
                  e.kpi >= 100 ? "success" : e.kpi >= 80 ? "warning" : "danger"
                }
              >
                {e.kpi >= 100
                  ? "Vượt KPI"
                  : e.kpi >= 80
                    ? "Theo dõi"
                    : "Cần cải thiện"}
              </Badge>
              <button className="btn ghost">Chi tiết</button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
