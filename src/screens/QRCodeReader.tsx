import React, { useCallback, useRef, useState } from 'react'
import { Alert, Linking, StyleSheet, View } from 'react-native'
import { useCameraDevice, useCodeScanner } from 'react-native-vision-camera'
import { Camera } from 'react-native-vision-camera'
import { useIsFocused } from '@react-navigation/core'
import { useIsForeground } from '../hooks/useIsForeground'
import { StatusBarBlurBackground } from '../components/StatusBarBlurBackground'
import Typography from '../components/Typography'
import { PressableOpacity } from 'react-native-pressable-opacity'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import { CONTENT_SPACING, CONTROL_BUTTON_SIZE, SAFE_AREA_PADDING } from '../utils/Constants'

type Props = NativeStackScreenProps<RootStackParamList, 'Reader'>

const showCodeAlert = (value: string, onDismissed: () => void): void => {
  const buttons = [
    {
      text: 'Close',
      style: 'cancel',
      onPress: onDismissed,
    },
  ] as any

  if (value.startsWith('http')) {
    buttons.push({
      text: 'Open URL',
      onPress: () => {
        Linking.openURL(value)
        onDismissed()
      },
      style: 'default'
    })
  }
  Alert.alert('Scanned Code', value, buttons)
}

const QRCodeReader = ({ navigation }: Props): React.ReactElement => {
  const device = useCameraDevice('back')
  const isFocused = useIsFocused()
  const isForeground = useIsForeground()
  const isActive = isFocused && isForeground
  const [torch, setTorch] = useState(false)
  const isShowingAlert = useRef(false)
  const onCodeScanned = useCallback((codes: any) => {
    const value = codes[0]?.value
    if (value == null) 
      return
    if (isShowingAlert.current) 
      return

    showCodeAlert(value, () => { isShowingAlert.current = false})
    isShowingAlert.current = true
  }, [])

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: onCodeScanned,
  })

  return <View style={styles.container}>
    {device && <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={isActive}
      codeScanner={codeScanner}
      torch={torch ? 'on' : 'off'}
      enableZoomGesture
    />}
    <StatusBarBlurBackground />
    <View style={styles.rightButtonRow}>
      <PressableOpacity style={styles.button} onPress={() => setTorch(!torch)} disabledOpacity={0.4}>
      <Typography variant="h2">{torch ? '🔦' : '💡'}</Typography>
      </PressableOpacity>
    </View>
    <PressableOpacity style={styles.backButton} onPress={navigation.goBack}>
      <Typography variant="h2">{'<-'}</Typography>
    </PressableOpacity>
    {!device && <View style={styles.center}>
      <Typography variant="h2">No camera device available</Typography>
      </View>
    }
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  button: {
    marginBottom: CONTENT_SPACING,
    width: CONTROL_BUTTON_SIZE,
    height: CONTROL_BUTTON_SIZE,
    borderRadius: CONTROL_BUTTON_SIZE / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
    right: SAFE_AREA_PADDING.paddingRight,
    top: SAFE_AREA_PADDING.paddingTop,
  },
  backButton: {
    position: 'absolute',
    left: SAFE_AREA_PADDING.paddingLeft,
    top: SAFE_AREA_PADDING.paddingTop,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
})

export default QRCodeReader
