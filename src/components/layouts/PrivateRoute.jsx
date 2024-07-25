import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export default function PrivateRoute({ children }) {

    const { isAuthorized } = useAuth()

  return isAuthorized ? children : <Navigate to="/login" />
}
