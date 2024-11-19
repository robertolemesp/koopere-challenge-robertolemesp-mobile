import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { createQRCodeService } from '../services/createQRCodeService'

const QRCodeRegister = () => {
    const [metadata, setMetadata] = useState('')
    const [qrCodeData, setQRCodeData] = useState<string | null>(null)

    const handleGenerateQRCode = async () => {
      try {
        const payload = { metadata }
        await createQRCodeService(payload)
        setQRCodeData(JSON.stringify(payload))
      } catch (error) {
        console.error((error as any).message)
      }
    }

  return <View style={styles.container}>
    <Text style={styles.label}>Metadata:</Text>
    <TextInput
      style={styles.input}
      value={metadata}
      onChangeText={setMetadata}
      placeholder='Enter Metadata'
    />
    <Button title='Generate QR Code' onPress={handleGenerateQRCode} />
    {qrCodeData && (
        <View style={styles.qrCodeContainer}>
          <QRCode value={qrCodeData} size={200} />
        </View>
    )}
  </View>
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  qrCodeContainer: { marginTop: 16, alignItems: 'center' },
})

export default QRCodeRegister
