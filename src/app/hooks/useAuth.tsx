import { useContext } from 'react'
import AuthContext from '../contexts/JWTAuthContext'

//import AuthContext from 'app/contexts/JWTAuthContext'

const useAuth = () => useContext(AuthContext)

export default useAuth
