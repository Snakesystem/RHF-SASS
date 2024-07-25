/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [isAuthorized, setIsAuthorization] = useState(true)
    
  return <AuthContext.Provider value={{user, setUser, isAuthorized, setIsAuthorization}}>
    { children }
  </AuthContext.Provider>
}

export default AuthProvider