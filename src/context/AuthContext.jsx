import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const adminUser = {
  id: 'AD001',
  name: 'Admin',
  role: 'admin',
  roleName: 'Quản trị viên',
  department: 'Ban quản trị',
  avatar: 'AD',
  phone: '0900000000',
  email: 'admin@hrspro.vn',
}

const employeeUser = {
  id: 'NV001',
  name: 'Nguyễn Minh Anh',
  role: 'employee',
  roleName: 'Sales Executive',
  department: 'Kinh doanh',
  avatar: 'MA',
  phone: '0903123112',
  email: 'minhanh@hrspro.vn',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hr_current_user')
      return saved ? JSON.parse(saved) : adminUser
    } catch {
      return adminUser
    }
  })

  useEffect(() => {
    localStorage.setItem('hr_current_user', JSON.stringify(user))
  }, [user])

  const switchToAdmin = () => setUser(adminUser)

  const switchToEmployee = () => setUser(employeeUser)

  const updateUser = (data) => {
    setUser(prev => ({
      ...prev,
      ...data,
    }))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user.role === 'admin',
        isEmployee: user.role === 'employee',
        switchToAdmin,
        switchToEmployee,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
