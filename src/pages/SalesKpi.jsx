import React from "react";
import { employees } from "../data/mock";
import { Badge, Card, Progress, SectionTitle } from "../components/UI";
import { shortMoney } from "../utils/format";

export default function SalesKpi() {
  const sales = employees.filter(
    (e) => e.department === "Kinh doanh" && e.revenue > 0,
  );
  return (
    <div className="page-stack">
      <div className="summary-strip">
        <div>
          <span>Mục tiêu tháng</span>
          <b>860 triệu</b>
        </div>
        <div>
          <span>Đã thực hiện</span>
          <b>286 triệu</b>
        </div>
        <div>
          <span>Dự báo cuối tháng</span>
          <b>803 triệu</b>
        </div>
        <div>
          <span>Gap cần bù</span>
          <b className="text-danger">57 triệu</b>
        </div>
      </div>
      <Card>
        <SectionTitle
          title="Mục tiêu theo nhân viên"
          subtitle="Doanh số và mức hoàn thành KPI"
          action={<button className="btn primary">Giao mục tiêu</button>}
        />
        <div className="sales-target-list">
          {sales.map((e, i) => {
            const target = [430, 390, 320][i] * 1_000_000;
            const pct = Math.round((e.revenue / target) * 100);
            return (
              <div className="sales-target-row" key={e.id}>
                <div className="person-cell">
                  <span className="avatar sm">{e.avatar}</span>
                  <div>
                    <b>{e.name}</b>
                    <small>{e.role}</small>
                  </div>
                </div>
                <div className="target-detail">
                  <div>
                    <span>
                      {shortMoney(e.revenue)} / {shortMoney(target)}
                    </span>
                    <b>{pct}%</b>
                  </div>
                  <Progress value={pct} />
                </div>
                <Badge
                  tone={
                    pct >= 100 ? "success" : pct >= 80 ? "warning" : "danger"
                  }
                >
                  {pct >= 100
                    ? "Vượt mục tiêu"
                    : pct >= 80
                      ? "Có thể đạt"
                      : "Nguy cơ hụt"}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
