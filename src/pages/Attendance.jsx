import React from "react";
import { Clock3, CalendarOff, TimerReset, UserCheck } from "lucide-react";
import { attendance } from "../data/mock";
import {
  Badge,
  Card,
  DataTable,
  MetricCard,
  SectionTitle,
} from "../components/UI";

export default function Attendance() {
  const cols = [
    { key: "name", label: "Nhân viên" },
    { key: "days", label: "Ngày công" },
    {
      key: "late",
      label: "Đi trễ",
      render: (v) => (
        <Badge tone={v >= 4 ? "danger" : v >= 2 ? "warning" : "neutral"}>
          {v} lần
        </Badge>
      ),
    },
    { key: "leave", label: "Nghỉ phép", render: (v) => `${v} ngày` },
    { key: "overtime", label: "Tăng ca", render: (v) => `${v} giờ` },
    {
      key: "rate",
      label: "Tỷ lệ",
      render: (v) => (
        <b className={v < 90 ? "text-danger" : "text-success"}>{v}%</b>
      ),
    },
  ];
  return (
    <div className="page-stack">
      <div className="metrics-grid">
        <MetricCard
          label="Đã check-in"
          value="38 / 43"
          change={2.7}
          icon={UserCheck}
          tone="green"
        />
        <MetricCard
          label="Đi trễ tháng này"
          value="18 lượt"
          change={-10}
          icon={Clock3}
          tone="orange"
        />
        <MetricCard
          label="Nghỉ phép"
          value="12,5 ngày"
          change={4}
          icon={CalendarOff}
          tone="blue"
        />
        <MetricCard
          label="Tăng ca"
          value="86,5 giờ"
          change={6}
          icon={TimerReset}
          tone="purple"
        />
      </div>
      <Card>
        <SectionTitle
          title="Bảng công tháng 10/2026"
          subtitle="Tổng hợp tự động từ dữ liệu check-in/check-out"
          action={<button className="btn primary">Chốt công</button>}
        />
        <DataTable rows={attendance} columns={cols} keyField="name" />
      </Card>
    </div>
  );
}
