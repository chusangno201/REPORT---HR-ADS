import React, { useEffect, useMemo, useState } from 'react'
import { Download, Plus, Search, X, Trash2, Save } from 'lucide-react'
import { employees as initialEmployees } from '../data/mock'
import { Badge, Card, DataTable, SectionTitle } from '../components/UI'
import { shortMoney } from '../utils/format'

const emptyForm = {
  id: '',
  name: '',
  role: 'Sales Executive',
  department: 'Kinh doanh',
  status: 'Đang làm',
  joined: new Date().toISOString().slice(0, 10),
  attendance: 100,
  kpi: 0,
  revenue: 0,
  avatar: '',
}

const toDisplayDate = (value) => {
  if (!value) return ''
  if (value.includes('/')) return value
  const [y, m, d] = value.split('-')
  return `${d}/${m}/${y}`
}

const toInputDate = (value) => {
  if (!value) return ''
  if (value.includes('-')) return value
  const [d, m, y] = value.split('/')
  return `${y}-${m}-${d}`
}

const initials = (name) => name
  .trim()
  .split(/\s+/)
  .slice(-2)
  .map(x => x[0]?.toUpperCase() || '')
  .join('')

export default function Employees(){
  const [employeeList, setEmployeeList] = useState(() => {
    try {
      const saved = localStorage.getItem('hr-sales-pro-employees')
      return saved ? JSON.parse(saved) : initialEmployees.map(x => ({ ...x }))
    } catch {
      return initialEmployees.map(x => ({ ...x }))
    }
  })
  const [q, setQ] = useState('')
  const [department, setDepartment] = useState('all')
  const [status, setStatus] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  useEffect(() => {
    localStorage.setItem('hr-sales-pro-employees', JSON.stringify(employeeList))
  }, [employeeList])

  const departments = useMemo(
    () => [...new Set(employeeList.map(e => e.department))],
    [employeeList]
  )

  const rows = useMemo(() => employeeList.filter(e => {
    const textMatch = `${e.name} ${e.role} ${e.department} ${e.id}`.toLowerCase().includes(q.toLowerCase())
    const deptMatch = department === 'all' || e.department === department
    const statusMatch = status === 'all' || e.status === status
    return textMatch && deptMatch && statusMatch
  }), [employeeList, q, department, status])

  const cols = [
    {key:'name',label:'Nhân viên',render:(v,r)=><div className="person-cell"><span className="avatar sm">{r.avatar}</span><div><b>{v}</b><small>{r.id}</small></div></div>},
    {key:'role',label:'Vị trí'},
    {key:'department',label:'Phòng ban'},
    {key:'status',label:'Trạng thái',render:v=><Badge tone={v==='Đang làm'?'success':'warning'}>{v}</Badge>},
    {key:'joined',label:'Ngày vào'},
    {key:'attendance',label:'Chấm công',render:v=><span className={v<90?'text-danger':''}>{v}%</span>},
    {key:'kpi',label:'KPI',render:v=><Badge tone={v>=100?'success':v>=80?'warning':'danger'}>{v}%</Badge>},
    {key:'revenue',label:'Doanh thu',render:v=>v?shortMoney(v):'—'},
  ]

  const openCreate = () => {
    const nextNumber = Math.max(0, ...employeeList.map(e => Number(String(e.id).replace(/\D/g, '')) || 0)) + 1
    setEditingId(null)
    setForm({ ...emptyForm, id: `NV${String(nextNumber).padStart(3, '0')}` })
    setError('')
    setModalOpen(true)
  }

  const openEdit = (row) => {
    setEditingId(row.id)
    setForm({ ...row, joined: toInputDate(row.joined) })
    setError('')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingId(null)
    setError('')
  }

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const saveEmployee = (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Vui lòng nhập họ tên nhân viên.')
      return
    }
    if (!form.role.trim()) {
      setError('Vui lòng nhập vị trí/chức danh.')
      return
    }

    const payload = {
      ...form,
      id: form.id.trim(),
      name: form.name.trim(),
      role: form.role.trim(),
      joined: toDisplayDate(form.joined),
      attendance: Number(form.attendance) || 0,
      kpi: Number(form.kpi) || 0,
      revenue: Number(form.revenue) || 0,
      avatar: initials(form.name) || 'NV',
    }

    if (editingId) {
      setEmployeeList(prev => prev.map(item => item.id === editingId ? payload : item))
    } else {
      setEmployeeList(prev => [payload, ...prev])
    }
    closeModal()
  }

  const deleteEmployee = () => {
    if (!editingId) return
    const current = employeeList.find(e => e.id === editingId)
    if (window.confirm(`Xóa nhân viên ${current?.name || editingId}?`)) {
      setEmployeeList(prev => prev.filter(item => item.id !== editingId))
      closeModal()
    }
  }

  const exportExcel = () => {
    const headers = ['Mã NV','Họ tên','Vị trí','Phòng ban','Trạng thái','Ngày vào','Chấm công','KPI','Doanh thu']
    const body = rows.map(e => [e.id,e.name,e.role,e.department,e.status,e.joined,`${e.attendance}%`,`${e.kpi}%`,e.revenue])
    const csv = [headers, ...body]
      .map(line => line.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `danh-sach-nhan-vien-${new Date().toISOString().slice(0,10)}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="page-stack">
      <Card>
        <SectionTitle
          title="Danh sách nhân viên"
          subtitle={`${employeeList.length} hồ sơ đang được quản lý`}
          action={
            <div className="button-row">
              <button className="btn secondary" type="button" onClick={exportExcel}><Download size={16}/> Xuất Excel</button>
              <button className="btn primary" type="button" onClick={openCreate}><Plus size={16}/> Thêm nhân viên</button>
            </div>
          }
        />

        <div className="filter-row">
          <label className="search in-card">
            <Search size={17}/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm theo tên, chức danh, phòng ban..."/>
          </label>
          <select value={department} onChange={e=>setDepartment(e.target.value)}>
            <option value="all">Tất cả phòng ban</option>
            {departments.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
          <select value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="all">Tất cả trạng thái</option>
            <option value="Đang làm">Đang làm</option>
            <option value="Thử việc">Thử việc</option>
            <option value="Đã nghỉ">Đã nghỉ</option>
          </select>
        </div>

        <DataTable rows={rows} columns={cols} onRowAction={openEdit} actionTitle="Sửa nhân viên" />
      </Card>

      {modalOpen && (
        <div className="modal-backdrop" onMouseDown={closeModal}>
          <div className="modal-card" onMouseDown={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h3>{editingId ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên'}</h3>
                <p>{editingId ? `Đang chỉnh sửa ${editingId}` : 'Tạo hồ sơ nhân sự mới'}</p>
              </div>
              <button className="icon-btn" type="button" onClick={closeModal}><X size={20}/></button>
            </div>

            <form onSubmit={saveEmployee}>
              <div className="form-grid">
                <label><span>Mã nhân viên</span><input value={form.id} onChange={e=>updateField('id',e.target.value)} disabled={Boolean(editingId)}/></label>
                <label><span>Họ và tên *</span><input value={form.name} onChange={e=>updateField('name',e.target.value)} placeholder="Nguyễn Văn A" autoFocus/></label>
                <label><span>Vị trí *</span><input value={form.role} onChange={e=>updateField('role',e.target.value)} placeholder="Sales Executive"/></label>
                <label><span>Phòng ban</span><select value={form.department} onChange={e=>updateField('department',e.target.value)}><option>Kinh doanh</option><option>Marketing</option><option>Nhân sự</option><option>Vận hành</option><option>Kế toán</option></select></label>
                <label><span>Trạng thái</span><select value={form.status} onChange={e=>updateField('status',e.target.value)}><option>Đang làm</option><option>Thử việc</option><option>Đã nghỉ</option></select></label>
                <label><span>Ngày vào</span><input type="date" value={form.joined} onChange={e=>updateField('joined',e.target.value)}/></label>
                <label><span>Chấm công (%)</span><input type="number" min="0" max="100" value={form.attendance} onChange={e=>updateField('attendance',e.target.value)}/></label>
                <label><span>KPI (%)</span><input type="number" min="0" max="300" value={form.kpi} onChange={e=>updateField('kpi',e.target.value)}/></label>
                <label className="full"><span>Doanh thu (VNĐ)</span><input type="number" min="0" step="1000" value={form.revenue} onChange={e=>updateField('revenue',e.target.value)}/></label>
              </div>

              {error && <div className="form-error">{error}</div>}

              <div className="modal-actions">
                {editingId && <button className="btn danger-outline" type="button" onClick={deleteEmployee}><Trash2 size={16}/> Xóa</button>}
                <div className="modal-actions-right">
                  <button className="btn secondary" type="button" onClick={closeModal}>Hủy</button>
                  <button className="btn primary" type="submit"><Save size={16}/> {editingId ? 'Lưu thay đổi' : 'Thêm nhân viên'}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
