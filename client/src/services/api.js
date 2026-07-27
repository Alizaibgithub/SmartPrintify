import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
})

export const validateFormatting = async (formData) => {
  try {
    const response = await api.post('/api/formatting/validate', formData)

    if (response?.data?.success === false) {
      throw new Error(response.data.message || 'Validation failed.')
    }

    return response.data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || 'Validation request failed.'
    throw new Error(message)
  }
}

export default api
