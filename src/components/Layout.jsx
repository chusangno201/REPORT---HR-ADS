import React, { useMemo, useState } from 'react'
import {
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import {
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  CircleGauge,
  Clock3,
  ContactRound,
  FileChartColumn,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldAlert,
  Target,
  UserRound,
  UserRoundCheck,
  UsersRound,
  X,
  Pencil,
  Repeat2,
  Check,
} from 'lucide-react'

import { useAuth } from '../context/AuthContext'

const adminGroups = [
  {
    title: 'TỔNG QUAN',
    items: [
      {
        to: '/',
        label: 'Dashboard điều hành',
        icon: CircleGauge,
      },
    ],
  },

  {
    title: 'NHÂN SỰ',
    items: [
      {
        to: '/employees',
        label: 'Hồ sơ nhân viên',
        icon: UsersRound,
      },
      {
        to: '/attendance',
        label: 'Chấm công',
        icon: Clock3,
      },
      {
        to: '/performance',
        label: 'KPI & hiệu suất',
        icon: UserRoundCheck,
      },
    ],
  },

  {
    title: 'KINH DOANH',
    items: [
      {
        to: '/leads',
        label: 'Lead & khách hàng',
        icon: ContactRound,
      },
      {
        to: '/pipeline',
        label: 'Pipeline bán hàng',
        icon: BriefcaseBusiness,
      },
      {
        to: '/sales-kpi',
        label: 'Mục tiêu doanh số',
        icon: Target,
      },
    ],
  },

  {
    title: 'QUẢN TRỊ',
    items: [
      {
        to: '/reports',
        label: 'Báo cáo quản trị',
        icon: FileChartColumn,
      },
      {
        to: '/issues',
        label: 'Cần khắc phục',
        icon: ShieldAlert,
        badge: 6,
      },
      {
        to: '/settings',
        label: 'Thiết lập',
        icon: Settings,
      },
    ],
  },
]

const employeeGroups = [
  {
    title: 'CÁ NHÂN',
    items: [
      {
        to: '/',
        label: 'Trang của tôi',
        icon: CircleGauge,
      },
      {
        to: '/employees',
        label: 'Hồ sơ của tôi',
        icon: UserRound,
      },
      {
        to: '/attendance',
        label: 'Chấm công của tôi',
        icon: Clock3,
      },
      {
        to: '/performance',
        label: 'KPI của tôi',
        icon: UserRoundCheck,
      },
    ],
  },

  {
    title: 'CÔNG VIỆC',
    items: [
      {
        to: '/leads',
        label: 'Khách hàng của tôi',
        icon: ContactRound,
      },
      {
        to: '/pipeline',
        label: 'Cơ hội của tôi',
        icon: BriefcaseBusiness,
      },
      {
        to: '/sales-kpi',
        label: 'Doanh số của tôi',
        icon: Target,
      },
    ],
  },
]

const adminTitles = {
  '/': [
    'Dashboard điều hành',
    'Tổng quan nhân sự và kinh doanh',
  ],

  '/employees': [
    'Hồ sơ nhân viên',
    'Quản lý thông tin và trạng thái nhân sự',
  ],

  '/attendance': [
    'Chấm công',
    'Theo dõi công, đi trễ, nghỉ phép và tăng ca',
  ],

  '/performance': [
    'KPI & hiệu suất',
    'Đánh giá hiệu suất nhân sự theo mục tiêu',
  ],

  '/leads': [
    'Lead & khách hàng',
    'Quản lý dữ liệu và lịch sử chăm sóc',
  ],

  '/pipeline': [
    'Pipeline bán hàng',
    'Theo dõi cơ hội theo từng giai đoạn',
  ],

  '/sales-kpi': [
    'Mục tiêu doanh số',
    'Giao chỉ tiêu và theo dõi mức hoàn thành',
  ],

  '/reports': [
    'Báo cáo quản trị',
    'Báo cáo đa chiều cho quản lý và lãnh đạo',
  ],

  '/issues': [
    'Cần khắc phục',
    'Các cảnh báo cần xử lý để cải thiện hiệu quả',
  ],

  '/settings': [
    'Thiết lập hệ thống',
    'Phân quyền, quy trình và cấu hình doanh nghiệp',
  ],
}

const employeeTitles = {
  '/': [
    'Trang làm việc',
    'Tổng quan công việc cá nhân hôm nay',
  ],

  '/employees': [
    'Hồ sơ của tôi',
    'Thông tin cá nhân và thông tin công việc',
  ],

  '/attendance': [
    'Chấm công của tôi',
    'Theo dõi ngày công, đi trễ và nghỉ phép',
  ],

  '/performance': [
    'KPI của tôi',
    'Theo dõi hiệu suất và tiến độ mục tiêu',
  ],

  '/leads': [
    'Khách hàng của tôi',
    'Danh sách khách hàng được phân công',
  ],

  '/pipeline': [
    'Cơ hội bán hàng',
    'Theo dõi các cơ hội tôi đang phụ trách',
  ],

  '/sales-kpi': [
    'Doanh số của tôi',
    'Theo dõi mục tiêu và doanh thu cá nhân',
  ],
}

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [search, setSearch] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  const {
    user,
    isAdmin,
    switchToAdmin,
    switchToEmployee,
    updateUser,
  } = useAuth()

  const groups = isAdmin
    ? adminGroups
    : employeeGroups

  const titles = isAdmin
    ? adminTitles
    : employeeTitles

  const [title, subtitle] =
    titles[location.pathname] || titles['/']

  const notifications = useMemo(() => {
    if (isAdmin) {
      return [
        {
          id: 1,
          title: '3 nhân viên dưới 70% KPI',
          time: '5 phút trước',
        },
        {
          id: 2,
          title: '5 lead chưa được chăm sóc',
          time: '20 phút trước',
        },
        {
          id: 3,
          title: '2 yêu cầu nghỉ phép chờ duyệt',
          time: '1 giờ trước',
        },
      ]
    }

    return [
      {
        id: 1,
        title: 'Bạn có 3 khách hàng cần gọi lại',
        time: '10 phút trước',
      },
      {
        id: 2,
        title: 'KPI tháng hiện đạt 84%',
        time: '1 giờ trước',
      },
    ]
  }, [isAdmin])

  const handleSearch = (e) => {
    e.preventDefault()

    if (!search.trim()) return

    if (isAdmin) {
      navigate(
        `/employees?search=${encodeURIComponent(search)}`
      )
    } else {
      navigate(
        `/leads?search=${encodeURIComponent(search)}`
      )
    }
  }

  const handleChangeRole = (role) => {
    setProfileOpen(false)

    if (role === 'admin') {
      switchToAdmin()
    } else {
      switchToEmployee()
    }

    navigate('/')
  }

  return (
    <div
      className={`app-shell ${
        isAdmin
          ? 'admin-layout'
          : 'employee-layout'
      }`}
    >
      <aside
        className={`sidebar ${
          sidebarOpen ? 'open' : ''
        }`}
      >
        <div className="brand">
          <div className="brand-mark">
            {isAdmin ? 'H' : user.avatar}
          </div>

          <div>
            <b>
              {isAdmin
                ? 'HR Sales Pro'
                : 'My Workspace'}
            </b>

            <small>
              {isAdmin
                ? 'Enterprise Suite'
                : user.department}
            </small>
          </div>

          <button
            type="button"
            className="mobile-close"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <X />
          </button>
        </div>

        <nav>
          {groups.map((group) => (
            <div
              className="nav-group"
              key={group.title}
            >
              <div className="nav-group-title">
                {group.title}
              </div>

              {group.items.map((item) => (
                <NavLink
                  end={item.to === '/'}
                  key={item.to}
                  to={item.to}
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className={({
                    isActive,
                  }) =>
                    `nav-item ${
                      isActive
                        ? 'active'
                        : ''
                    }`
                  }
                >
                  <item.icon size={19} />

                  <span>
                    {item.label}
                  </span>

                  {!!item.badge && (
                    <em>
                      {item.badge}
                    </em>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          {isAdmin ? (
            <div className="upgrade">
              <b>
                Gói Business
              </b>

              <span>
                43 / 60 nhân sự
              </span>

              <div className="mini-progress">
                <i
                  style={{
                    width: '72%',
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="employee-info-card">
              <span>
                Mã nhân viên
              </span>

              <b>
                {user.id}
              </b>

              <small>
                {user.department}
              </small>
            </div>
          )}
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <button
            type="button"
            className="menu-btn"
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            <Menu />
          </button>

          <div className="page-heading">
            <h1>
              {title}
            </h1>

            <span>
              {subtitle}
            </span>
          </div>

          <div className="top-actions">
            <form
              className="search"
              onSubmit={handleSearch}
            >
              <Search size={18} />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder={
                  isAdmin
                    ? 'Tìm nhân viên, khách hàng...'
                    : 'Tìm khách hàng của tôi...'
                }
              />
            </form>

            <div className="top-dropdown-wrap">
              <button
                type="button"
                className="icon-btn notif"
                onClick={() => {
                  setNotificationsOpen(
                    !notificationsOpen
                  )
                  setProfileOpen(false)
                }}
              >
                <Bell size={19} />

                {notifications.length > 0 && (
                  <i />
                )}
              </button>

              {notificationsOpen && (
                <div className="notification-dropdown">
                  <div className="dropdown-header">
                    <b>
                      Thông báo
                    </b>

                    <button
                      type="button"
                      onClick={() =>
                        setNotificationsOpen(
                          false
                        )
                      }
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {notifications.map(
                    (notification) => (
                      <button
                        type="button"
                        className="notification-item"
                        key={
                          notification.id
                        }
                      >
                        <span className="notification-dot" />

                        <div>
                          <b>
                            {
                              notification.title
                            }
                          </b>

                          <small>
                            {
                              notification.time
                            }
                          </small>
                        </div>
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="profile-wrap">
              <button
                type="button"
                className="profile"
                onClick={() => {
                  setProfileOpen(
                    !profileOpen
                  )

                  setNotificationsOpen(
                    false
                  )
                }}
              >
                <span className="avatar">
                  {user.avatar}
                </span>

                <span className="profile-text">
                  <b>
                    {user.name}
                  </b>

                  <small>
                    {user.roleName}
                  </small>
                </span>

                <ChevronDown
                  size={16}
                />
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-user">
                    <span className="avatar large">
                      {user.avatar}
                    </span>

                    <div>
                      <b>
                        {user.name}
                      </b>

                      <small>
                        {user.email}
                      </small>
                    </div>
                  </div>

                  <div className="profile-divider" />

                  <button
                    type="button"
                    onClick={() => {
                      setEditProfileOpen(
                        true
                      )
                      setProfileOpen(
                        false
                      )
                    }}
                  >
                    <Pencil size={17} />

                    Chỉnh sửa hồ sơ
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleChangeRole(
                        isAdmin
                          ? 'employee'
                          : 'admin'
                      )
                    }
                  >
                    <Repeat2 size={17} />

                    {isAdmin
                      ? 'Xem giao diện nhân viên'
                      : 'Chuyển sang Admin'}
                  </button>

                  <div className="profile-divider" />

                  <button
                    type="button"
                    className="danger-menu"
                    onClick={() => {
                      localStorage.removeItem(
                        'hr_current_user'
                      )

                      window.location.reload()
                    }}
                  >
                    <LogOut size={17} />

                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="content">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {editProfileOpen && (
        <EditProfileModal
          user={user}
          onClose={() =>
            setEditProfileOpen(false)
          }
          onSave={(data) => {
            updateUser(data)
            setEditProfileOpen(false)
          }}
        />
      )}
    </div>
  )
}

function EditProfileModal({
  user,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    department:
      user.department || '',
    roleName:
      user.roleName || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const initials = form.name
      .split(' ')
      .filter(Boolean)
      .slice(-2)
      .map((word) =>
        word.charAt(0)
      )
      .join('')
      .toUpperCase()

    onSave({
      ...form,
      avatar:
        initials ||
        user.avatar,
    })
  }

  return (
    <div className="modal-backdrop">
      <div className="profile-modal">
        <div className="modal-header">
          <div>
            <h3>
              Chỉnh sửa hồ sơ
            </h3>

            <span>
              Cập nhật thông tin tài khoản
            </span>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <div className="form-grid">
            <label>
              Họ và tên

              <input
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name:
                      e.target
                        .value,
                  })
                }
                required
              />
            </label>

            <label>
              Số điện thoại

              <input
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone:
                      e.target
                        .value,
                  })
                }
              />
            </label>

            <label>
              Email

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email:
                      e.target
                        .value,
                  })
                }
              />
            </label>

            <label>
              Phòng ban

              <input
                value={
                  form.department
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    department:
                      e.target
                        .value,
                  })
                }
              />
            </label>

            <label className="full">
              Chức vụ

              <input
                value={
                  form.roleName
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    roleName:
                      e.target
                        .value,
                  })
                }
              />
            </label>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn secondary"
              onClick={onClose}
            >
              Hủy
            </button>

            <button
              type="submit"
              className="btn primary"
            >
              <Check size={18} />

              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}