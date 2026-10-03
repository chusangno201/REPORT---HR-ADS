import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle2, LogIn, LogOut, Search, UserPlus } from "lucide-react";
import { leads as seedLeads } from "../data/mock";
import { Badge, Card, DataTable, SectionTitle } from "../components/UI";
import { shortMoney } from "../utils/format";

const STORAGE_KEY = "hr-sales-leads-v2";
const stageTone = {
  "Lead mới": "neutral",
  "Tư vấn": "blue",
  "Đặt lịch": "warning",
  "Báo giá": "purple",
  Mất: "danger",
};

function loadLeads() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Array.isArray(saved) && saved.length) return saved;
  } catch (_) {}
  return seedLeads;
}

export default function Leads() {
  const [data, setData] = useState(loadLeads);
  const [q, setQ] = useState("");
  const [source, setSource] = useState("Tất cả nguồn");
  const [stage, setStage] = useState("Tất cả giai đoạn");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const totalCustomers = data.length;
  const totalCheckIn = data.filter((x) => x.checkIn).length;
  const totalCheckOut = data.filter((x) => x.checkOut).length;
  const checkoutRate = totalCheckIn ? (totalCheckOut / totalCheckIn) * 100 : 0;

  const rows = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    return data.filter((l) => {
      const matchesQ = `${l.customer} ${l.phone} ${l.owner} ${l.source}`
        .toLowerCase()
        .includes(keyword);
      const matchesSource = source === "Tất cả nguồn" || l.source === source;
      const matchesStage = stage === "Tất cả giai đoạn" || l.stage === stage;
      return matchesQ && matchesSource && matchesStage;
    });
  }, [data, q, source, stage]);

  const markCheckIn = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              checkIn: true,
              checkInAt: item.checkInAt || new Date().toLocaleString("vi-VN"),
            }
          : item,
      ),
    );
  };

  const markCheckOut = (id) => {
    setData((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (!item.checkIn) {
          alert("Khách cần check-in trước khi check-out.");
          return item;
        }
        return {
          ...item,
          checkOut: true,
          checkOutAt: item.checkOutAt || new Date().toLocaleString("vi-VN"),
        };
      }),
    );
  };

  const cols = [
    { key: "customer", label: "Khách hàng", render: (v) => <b>{v}</b> },
    {
      key: "phone",
      label: "SĐT",
      render: (v) => (
        <a className="phone-link" href={`tel:${v}`}>
          {v}
        </a>
      ),
    },
    { key: "source", label: "Nguồn" },
    { key: "owner", label: "Phụ trách" },
    {
      key: "stage",
      label: "Giai đoạn",
      render: (v) => <Badge tone={stageTone[v]}>{v}</Badge>,
    },
    { key: "value", label: "Giá trị", render: (v) => shortMoney(v) },
    {
      key: "checkIn",
      label: "Check-in",
      render: (v, r) =>
        v ? (
          <div className="visit-status">
            <Badge tone="success">
              <CheckCircle2 size={12} /> Đã check-in
            </Badge>
            <small>{r.checkInAt || ""}</small>
          </div>
        ) : (
          <button
            className="btn mini secondary"
            type="button"
            onClick={() => markCheckIn(r.id)}
          >
            <LogIn size={13} /> Check-in
          </button>
        ),
    },
    {
      key: "checkOut",
      label: "Check-out",
      render: (v, r) =>
        v ? (
          <div className="visit-status">
            <Badge tone="success">
              <CheckCircle2 size={12} /> Đã check-out
            </Badge>
            <small>{r.checkOutAt || ""}</small>
          </div>
        ) : (
          <button
            className="btn mini primary"
            type="button"
            disabled={!r.checkIn}
            onClick={() => markCheckOut(r.id)}
          >
            <LogOut size={13} /> Check-out
          </button>
        ),
    },
  ];

  return (
    <div className="page-stack">
      <div className="summary-strip customer-summary">
        <div>
          <span>Tổng khách hàng</span>
          <b>{totalCustomers}</b>
        </div>
        <div>
          <span>Tổng khách check-in</span>
          <b>{totalCheckIn}</b>
        </div>
        <div>
          <span>Tổng khách check-out</span>
          <b>{totalCheckOut}</b>
        </div>
        <div>
          <span>Tỷ lệ check-out / check-in</span>
          <b>{checkoutRate.toFixed(1)}%</b>
        </div>
      </div>

      <Card>
        <SectionTitle
          title="Dữ liệu khách hàng"
          subtitle="Theo dõi SĐT, nguồn khách và trạng thái check-in / check-out"
          action={
            <button
              className="btn primary"
              type="button"
              onClick={() => alert("Bước tiếp theo: mở form Thêm lead")}
            >
              <UserPlus size={16} /> Thêm lead
            </button>
          }
        />

        <div className="filter-row">
          <label className="search in-card">
            <Search size={17} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm tên, SĐT, sale, nguồn..."
            />
          </label>

          <select value={source} onChange={(e) => setSource(e.target.value)}>
            <option>Tất cả nguồn</option>
            <option>Facebook Ads</option>
            <option>TikTok Ads</option>
            <option>Website</option>
            <option>Referral</option>
            <option>Google</option>
          </select>

          <select value={stage} onChange={(e) => setStage(e.target.value)}>
            <option>Tất cả giai đoạn</option>
            <option>Lead mới</option>
            <option>Tư vấn</option>
            <option>Đặt lịch</option>
            <option>Báo giá</option>
            <option>Mất</option>
          </select>
        </div>

        <DataTable rows={rows} columns={cols} />
      </Card>
    </div>
  );
}
