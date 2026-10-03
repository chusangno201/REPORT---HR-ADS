export const employees = [
  { id: 'NV001', name: 'Nguyễn Minh Anh', role: 'Sales Executive', department: 'Kinh doanh', status: 'Đang làm', joined: '12/01/2025', attendance: 97, kpi: 112, revenue: 486000000, avatar: 'MA' },
  { id: 'NV002', name: 'Trần Quốc Bảo', role: 'Sales Executive', department: 'Kinh doanh', status: 'Đang làm', joined: '03/03/2025', attendance: 94, kpi: 84, revenue: 326000000, avatar: 'QB' },
  { id: 'NV003', name: 'Lê Ngọc Hân', role: 'HR Specialist', department: 'Nhân sự', status: 'Đang làm', joined: '18/06/2024', attendance: 99, kpi: 106, revenue: 0, avatar: 'NH' },
  { id: 'NV004', name: 'Phạm Gia Huy', role: 'Sales Executive', department: 'Kinh doanh', status: 'Đang làm', joined: '21/02/2026', attendance: 88, kpi: 61, revenue: 174000000, avatar: 'GH' },
  { id: 'NV005', name: 'Võ Thanh Trúc', role: 'CSKH', department: 'Kinh doanh', status: 'Đang làm', joined: '08/08/2025', attendance: 96, kpi: 91, revenue: 0, avatar: 'TT' },
  { id: 'NV006', name: 'Đặng Đức Long', role: 'Marketing', department: 'Marketing', status: 'Thử việc', joined: '14/09/2026', attendance: 93, kpi: 77, revenue: 0, avatar: 'DL' },
]

export const leads = [
  { id: 'LD001', customer: 'Nguyễn Thị Mai', phone: '0903123112', source: 'Facebook Ads', owner: 'Nguyễn Minh Anh', stage: 'Tư vấn', value: 45000000, age: 1, next: 'Gọi lại 15:00', probability: 35, checkIn: true, checkOut: true, checkInAt: '03/10/2026 08:15', checkOutAt: '03/10/2026 09:40' },
  { id: 'LD002', customer: 'Trần Văn Phúc', phone: '0938945945', source: 'TikTok Ads', owner: 'Trần Quốc Bảo', stage: 'Đặt lịch', value: 62000000, age: 2, next: 'Xác nhận lịch', probability: 60, checkIn: true, checkOut: false, checkInAt: '03/10/2026 08:52', checkOutAt: '' },
  { id: 'LD003', customer: 'Lê Thanh Hà', phone: '0987651651', source: 'Website', owner: 'Phạm Gia Huy', stage: 'Lead mới', value: 28000000, age: 4, next: 'Chưa có lịch chăm', probability: 15, checkIn: false, checkOut: false, checkInAt: '', checkOutAt: '' },
  { id: 'LD004', customer: 'Phạm Bảo Yến', phone: '0912430430', source: 'Referral', owner: 'Nguyễn Minh Anh', stage: 'Báo giá', value: 79000000, age: 1, next: 'Follow báo giá', probability: 75, checkIn: true, checkOut: true, checkInAt: '02/10/2026 14:05', checkOutAt: '02/10/2026 16:20' },
  { id: 'LD005', customer: 'Vũ Đức Nam', phone: '0963088088', source: 'Facebook Ads', owner: 'Trần Quốc Bảo', stage: 'Mất', value: 36000000, age: 8, next: 'Giá cao', probability: 0, checkIn: false, checkOut: false, checkInAt: '', checkOutAt: '' },
  { id: 'LD006', customer: 'Đỗ Minh Châu', phone: '0972732732', source: 'Google', owner: 'Phạm Gia Huy', stage: 'Lead mới', value: 51000000, age: 5, next: 'Chưa liên hệ', probability: 10, checkIn: true, checkOut: false, checkInAt: '03/10/2026 09:03', checkOutAt: '' },
]

export const salesTrend = [
  { month: 'T4', revenue: 610, target: 650, leads: 148 },
  { month: 'T5', revenue: 690, target: 680, leads: 166 },
  { month: 'T6', revenue: 740, target: 720, leads: 181 },
  { month: 'T7', revenue: 705, target: 750, leads: 175 },
  { month: 'T8', revenue: 820, target: 780, leads: 207 },
  { month: 'T9', revenue: 865, target: 820, leads: 221 },
  { month: 'T10', revenue: 286, target: 860, leads: 74 },
]

export const sourceData = [
  { name: 'Facebook Ads', value: 38 },
  { name: 'TikTok Ads', value: 24 },
  { name: 'Website', value: 18 },
  { name: 'Referral', value: 12 },
  { name: 'Google', value: 8 },
]

export const departmentData = [
  { name: 'Kinh doanh', headcount: 18, performance: 91 },
  { name: 'Marketing', headcount: 7, performance: 86 },
  { name: 'Nhân sự', headcount: 4, performance: 96 },
  { name: 'Vận hành', headcount: 9, performance: 89 },
  { name: 'Kế toán', headcount: 5, performance: 94 },
]

export const activities = [
  { time: '08:42', person: 'Nguyễn Minh Anh', text: 'Cập nhật cơ hội Nguyễn Thị Mai sang “Tư vấn”.' },
  { time: '08:21', person: 'HR', text: 'Duyệt đơn nghỉ phép 0.5 ngày của Võ Thanh Trúc.' },
  { time: '07:58', person: 'Trần Quốc Bảo', text: 'Check-in tại văn phòng.' },
  { time: 'Hôm qua', person: 'Phạm Gia Huy', text: 'Tạo báo giá 51.000.000đ cho khách hàng mới.' },
]

export const attendance = [
  { name: 'Nguyễn Minh Anh', days: 22, late: 1, leave: 0, overtime: 8.5, rate: 97 },
  { name: 'Trần Quốc Bảo', days: 21, late: 2, leave: 1, overtime: 5, rate: 94 },
  { name: 'Lê Ngọc Hân', days: 22, late: 0, leave: 0, overtime: 3, rate: 99 },
  { name: 'Phạm Gia Huy', days: 19, late: 5, leave: 2, overtime: 1.5, rate: 88 },
  { name: 'Võ Thanh Trúc', days: 21.5, late: 1, leave: 0.5, overtime: 4, rate: 96 },
]

export const reportRows = [
  { metric: 'Doanh thu', current: 865000000, previous: 820000000, target: 820000000, type: 'money' },
  { metric: 'Lead mới', current: 221, previous: 207, target: 210, type: 'number' },
  { metric: 'Tỷ lệ đặt lịch', current: 18.6, previous: 17.9, target: 20, type: 'percent' },
  { metric: 'Tỷ lệ chốt', current: 42.3, previous: 39.4, target: 45, type: 'percent' },
  { metric: 'Nhân sự đạt KPI', current: 78, previous: 74, target: 85, type: 'percent' },
  { metric: 'Tỷ lệ chấm công', current: 95.1, previous: 94.2, target: 97, type: 'percent' },
]
