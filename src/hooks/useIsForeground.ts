import { useEffect, useState } from 'react'
import { AppState } from 'react-native'

export const useIsForeground = () => {
  const [isForeground, setIsForeground] = useState(true)
  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => setIsForeground(nextAppState === 'active')
    
    const subscription = AppState.addEventListener('change', handleAppStateChange)

    return () => subscription.remove()
  }, [])
  
  return isForeground
}
