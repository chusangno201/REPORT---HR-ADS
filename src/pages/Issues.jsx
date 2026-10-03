import React from "react";
import {
  AlertTriangle,
  ArrowRight,
  CircleAlert,
  Clock3,
  Target,
  UserRoundX,
  Zap,
} from "lucide-react";
import { Badge, Card, SectionTitle } from "../components/UI";

const issues = [
  {
    level: "critical",
    icon: Clock3,
    title: "2 lead quá 48 giờ chưa được chăm sóc",
    detail:
      "LD003 và LD006 chưa có hoạt động liên hệ mới. Khả năng mất lead tăng mạnh khi phản hồi chậm.",
    owner: "Phạm Gia Huy",
    action: "Ưu tiên liên hệ ngay và tạo lịch follow-up.",
    tag: "Sales",
  },
  {
    level: "critical",
    icon: Target,
    title: "1 Sales chỉ đạt 61% KPI",
    detail:
      "Phạm Gia Huy đang thấp hơn ngưỡng cảnh báo 70%. Pipeline cá nhân hiện chưa đủ bù gap doanh số.",
    owner: "Sales Manager",
    action: "Review pipeline 1:1 và bổ sung lead đủ chất lượng.",
    tag: "KPI",
  },
  {
    level: "warning",
    icon: AlertTriangle,
    title: "Tỷ lệ đặt lịch 18,6% thấp hơn mục tiêu 20%",
    detail:
      "Lead vẫn tăng nhưng chuyển đổi sang lịch hẹn chưa theo kịp. Cần kiểm tra chất lượng lead và kịch bản tư vấn.",
    owner: "Sales + Marketing",
    action: "So sánh CR theo nguồn và theo từng Sales.",
    tag: "Conversion",
  },
  {
    level: "warning",
    icon: UserRoundX,
    title: "Tỷ lệ chấm công mới đạt 95,1%",
    detail:
      "Mục tiêu nội bộ là 97%. Có 18 lượt đi trễ trong tháng và 3 lượt đang chờ xác nhận.",
    owner: "HR",
    action: "Xác minh lượt đi trễ và nhắc quy định chấm công.",
    tag: "HR",
  },
  {
    level: "info",
    icon: Zap,
    title: "Dự báo doanh thu cuối tháng thiếu 57 triệu",
    detail:
      "Theo tốc độ hiện tại, dự báo đạt khoảng 803/860 triệu. Có thể bù nếu đẩy cơ hội giai đoạn báo giá.",
    owner: "Sales Manager",
    action: "Tập trung cơ hội xác suất ≥60% trong 7 ngày tới.",
    tag: "Forecast",
  },
  {
    level: "info",
    icon: CircleAlert,
    title: "5 nhân sự dưới 80% KPI",
    detail: "Nhóm này cần kế hoạch cải thiện thay vì chờ cuối kỳ mới đánh giá.",
    owner: "HR + Trưởng bộ phận",
    action: "Tạo PIP nhẹ theo tuần và theo dõi tiến độ.",
    tag: "Performance",
  },
];
export default function Issues() {
  return (
    <div className="page-stack">
      <div className="issues-summary">
        <div className="critical">
          <b>2</b>
          <span>Nghiêm trọng</span>
        </div>
        <div className="warning">
          <b>2</b>
          <span>Cần theo dõi</span>
        </div>
        <div className="info">
          <b>2</b>
          <span>Khuyến nghị</span>
        </div>
      </div>
      <Card>
        <SectionTitle
          title="Trung tâm cảnh báo"
          subtitle="Quy tắc tự động phát hiện điểm cần khắc phục"
          action={
            <button className="btn secondary">Cấu hình ngưỡng cảnh báo</button>
          }
        />
        <div className="issue-list">
          {issues.map((x, i) => (
            <article className={`issue ${x.level}`} key={i}>
              <div className="issue-icon">
                <x.icon size={20} />
              </div>
              <div className="issue-content">
                <div className="issue-title">
                  <h3>{x.title}</h3>
                  <Badge
                    tone={
                      x.level === "critical"
                        ? "danger"
                        : x.level === "warning"
                          ? "warning"
                          : "blue"
                    }
                  >
                    {x.tag}
                  </Badge>
                </div>
                <p>{x.detail}</p>
                <div className="issue-foot">
                  <span>
                    <b>Phụ trách:</b> {x.owner}
                  </span>
                  <span>
                    <b>Đề xuất:</b> {x.action}
                  </span>
                </div>
              </div>
              <button className="icon-btn">
                <ArrowRight size={19} />
              </button>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}
