import { validateFormatting } from './api.js'

export const submitFormattingRequest = async (file, options = {}) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('options', JSON.stringify(options))

  return validateFormatting(formData)
}
