# HR Sales Pro — ReactJS Starter

Bộ khung quản trị Nhân sự + Sales/CRM lấy cảm hứng từ cách tổ chức nghiệp vụ của các hệ thống ERP/HRM/CRM doanh nghiệp (không sao chép thương hiệu/giao diện MISA).

## Có sẵn
- Dashboard điều hành HR + Sales
- Hồ sơ nhân viên
- Chấm công
- KPI & hiệu suất
- Lead/khách hàng
- Pipeline Kanban
- Mục tiêu doanh số
- Báo cáo quản trị
- Trung tâm “Cần khắc phục” với cảnh báo vận hành
- Thiết lập quy trình/phân quyền cơ bản
- Responsive desktop/tablet/mobile

## Chạy dự án
```bash
npm install
npm run dev
```
Mở: http://localhost:5173

## Build production
```bash
npm run build
npm run preview
```

## Bước tiếp theo để dùng thật
Frontend hiện dùng mock data. Nên nối API backend (Node.js/NestJS/Express), PostgreSQL, JWT/RBAC, audit log và webhook Facebook/TikTok/website.

Các bảng dữ liệu cốt lõi nên có:
- users, roles, permissions
- employees, departments, contracts
- attendance_logs, leave_requests
- kpis, kpi_results, performance_reviews
- leads, customers, deals, deal_stages, activities
- sales_targets, orders, payments
- alert_rules, alerts, notifications
- audit_logs
