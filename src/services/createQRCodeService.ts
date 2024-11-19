import axios from 'axios'

const API_BASE_URL = 'http:localhost:8000'

export interface CreateQRCodePayload {
  metadata: string
}

export const createQRCodeService = async (payload: CreateQRCodePayload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/qr-code/create`, payload)
    return response.data
  } catch (error) {
    console.error('Error creating QR Code:', error)
    throw new Error('Failed to create QR Code.')
  }
}
