import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'
//import NotificationContext from 'app/contexts/NotificationContext'

const useNotification = () => useContext(NotificationContext)

export default useNotification
