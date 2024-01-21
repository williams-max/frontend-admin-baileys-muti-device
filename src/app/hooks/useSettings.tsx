import { useContext } from 'react'

import SettingsContext from '../contexts/SettingsContext'
//import SettingsContext from 'app/contexts/SettingsContext'

const useSettings = () => useContext(SettingsContext)

export default useSettings
