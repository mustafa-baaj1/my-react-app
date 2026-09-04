import { useCallback, useEffect, useMemo, useState } from 'react'
import { loginUser, logoutUser, registerUser, restoreAuthentication, updateLocalDisplayName } from '../services/authService'
import AuthContextValue from './authContextValue'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    let isActive = true

    restoreAuthentication()
      .then((session) => {
        if (isActive && session) {
          setUser(session.user)
          setToken(session.token)
        }
      })
      .finally(() => {
        if (isActive) setIsInitializing(false)
      })

    return () => {
      isActive = false
    }
  }, [])

  const login = useCallback(async (credentials) => {
    const session = await loginUser(credentials)
    setUser(session.user)
    setToken(session.token)
    return session.user
  }, [])

  const register = useCallback(async (registrationData) => {
    const session = await registerUser(registrationData)
    setUser(session.user)
    setToken(session.token)
    return session.user
  }, [])

  const logout = useCallback(() => {
    logoutUser()
    setUser(null)
    setToken(null)
  }, [])

  const updateDisplayName = useCallback((displayName) => {
    const session = updateLocalDisplayName(displayName)
    setUser(session.user)
    setToken(session.token)
    return session.user
  }, [])

  const value = useMemo(() => ({
    user,
    token,
    isAuthenticated: Boolean(user && token),
    isInitializing,
    login,
    register,
    logout,
    updateDisplayName,
  }), [user, token, isInitializing, login, register, logout, updateDisplayName])

  return <AuthContextValue.Provider value={value}>{children}</AuthContextValue.Provider>
}

export default AuthProvider
