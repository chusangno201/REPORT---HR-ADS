import React from 'react'
import { ArrowDownRight, ArrowUpRight, MoreHorizontal } from 'lucide-react'

export function Card({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>
}

export function MetricCard({ label, value, change, icon: Icon, tone = 'green', helper }) {
  const up = change >= 0
  return (
    <Card className="metric-card">
      <div className={`metric-icon ${tone}`}><Icon size={20} /></div>
      <div className="metric-body">
        <div className="metric-label">{label}</div>
        <div className="metric-value">{value}</div>
        <div className="metric-meta">
          <span className={up ? 'trend up' : 'trend down'}>{up ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {Math.abs(change)}%</span>
          <span>{helper || 'so với kỳ trước'}</span>
        </div>
      </div>
    </Card>
  )
}

export function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="section-title">
      <div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>
      {action}
    </div>
  )
}

export function Badge({ children, tone = 'neutral' }) {
  return <span className={`badge ${tone}`}>{children}</span>
}

export function DataTable({ columns, rows, keyField = 'id', onRowAction, actionTitle = 'Chỉnh sửa' }) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{columns.map(col => <th key={col.key}>{col.label}</th>)}<th></th></tr></thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row[keyField] || idx}>
              {columns.map(col => <td key={col.key}>{col.render ? col.render(row[col.key], row) : row[col.key]}</td>)}
              <td className="actions">
                <button
                  className="icon-btn"
                  type="button"
                  title={actionTitle}
                  aria-label={actionTitle}
                  onClick={() => onRowAction?.(row)}
                >
                  <MoreHorizontal size={18}/>
                </button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={columns.length + 1} className="empty-cell">Không có dữ liệu phù hợp.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export function Progress({ value, max = 100, label }) {
  const pct = Math.max(0, Math.min(100, value / max * 100))
  return <div className="progress-group">{label && <div className="progress-label">{label}<b>{Math.round(pct)}%</b></div>}<div className="progress"><span style={{ width: `${pct}%` }} /></div></div>
}
