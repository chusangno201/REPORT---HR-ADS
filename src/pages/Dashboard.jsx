import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Banknote,
  BriefcaseBusiness,
  CalendarCheck2,
  UsersRound,
  ArrowRight,
} from "lucide-react";
import { activities, departmentData, salesTrend } from "../data/mock";
import {
  Card,
  MetricCard,
  Progress,
  SectionTitle,
  Badge,
} from "../components/UI";

export default function Dashboard() {
  return (
    <div className="page-stack">
      <div className="toolbar">
        <div className="date-chip">Tháng 10/2026</div>
        <button className="btn secondary">Xuất báo cáo</button>
        <button className="btn primary">+ Tạo nhanh</button>
      </div>
      <div className="metrics-grid">
        <MetricCard
          label="Tổng nhân sự"
          value="43"
          change={7.5}
          icon={UsersRound}
          tone="blue"
          helper="3 nhân sự mới"
        />
        <MetricCard
          label="Doanh thu tháng"
          value="286 triệu"
          change={12.4}
          icon={Banknote}
          tone="green"
          helper="33% mục tiêu tháng"
        />
        <MetricCard
          label="Pipeline mở"
          value="1,42 tỷ"
          change={8.1}
          icon={BriefcaseBusiness}
          tone="purple"
          helper="36 cơ hội đang mở"
        />
        <MetricCard
          label="Tỷ lệ chấm công"
          value="95,1%"
          change={0.9}
          icon={CalendarCheck2}
          tone="orange"
          helper="mục tiêu 97%"
        />
      </div>

      <div className="dashboard-grid two-one">
        <Card>
          <SectionTitle
            title="Doanh thu & mục tiêu"
            subtitle="Đơn vị: triệu đồng"
            action={<Badge tone="success">+5,5% so với T9</Badge>}
          />
          <div className="chart-lg">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesTrend}
                margin={{ left: -20, right: 6, top: 10 }}
              >
                <defs>
                  <linearGradient id="fillRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f8a67" stopOpacity={0.26} />
                    <stop offset="95%" stopColor="#0f8a67" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#edf1ef"
                />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0f8a67"
                  strokeWidth={2.5}
                  fill="url(#fillRev)"
                  name="Doanh thu"
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#94a3b8"
                  strokeDasharray="5 5"
                  strokeWidth={1.5}
                  fill="transparent"
                  name="Mục tiêu"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <SectionTitle title="Tình trạng hôm nay" subtitle="03/10/2026" />
          <div className="today-stats">
            <div>
              <b>38</b>
              <span>Đã check-in</span>
            </div>
            <div>
              <b>3</b>
              <span>Đi trễ</span>
            </div>
            <div>
              <b>2</b>
              <span>Nghỉ phép</span>
            </div>
            <div>
              <b>0</b>
              <span>Vắng không phép</span>
            </div>
          </div>
          <hr />
          <div className="attention">
            <div className="attention-head">
              <span>Việc cần xử lý</span>
              <b>6 cảnh báo</b>
            </div>
            <p>2 lead quá 48 giờ chưa chăm sóc</p>
            <p>1 nhân viên dưới 70% KPI</p>
            <p>3 lượt đi trễ cần xác nhận</p>
            <a href="/issues">
              Xem tất cả <ArrowRight size={14} />
            </a>
          </div>
        </Card>
      </div>

      <div className="dashboard-grid half-half">
        <Card>
          <SectionTitle
            title="Hiệu suất phòng ban"
            subtitle="KPI trung bình tháng hiện tại"
          />
          <div className="chart-md">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentData}
                layout="vertical"
                margin={{ left: 10, right: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#edf1ef"
                />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={74}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Bar
                  dataKey="performance"
                  fill="#0f8a67"
                  radius={[0, 6, 6, 0]}
                  barSize={13}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <SectionTitle
            title="Hoạt động gần đây"
            subtitle="Cập nhật từ HR & Sales"
          />
          <div className="activity-list">
            {activities.map((a, i) => (
              <div className="activity-item" key={i}>
                <span className="activity-dot" />
                <div>
                  <b>{a.person}</b>
                  <p>{a.text}</p>
                </div>
                <time>{a.time}</time>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle
          title="Mục tiêu trọng yếu"
          subtitle="Theo dõi các chỉ số cần bám sát trong tháng"
        />
        <div className="goal-grid">
          <Progress value={286} max={860} label="Doanh thu 286 / 860 triệu" />
          <Progress value={74} max={220} label="Lead 74 / 220" />
          <Progress value={18.6} max={20} label="Tỷ lệ đặt lịch 18,6 / 20%" />
          <Progress value={78} max={85} label="Nhân sự đạt KPI 78 / 85%" />
        </div>
      </Card>
    </div>
  );
}
