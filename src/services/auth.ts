import axios from 'axios'

//* config
import { API_ENDPOINT, CONFIG_API } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'

//** types */
import { TLoginAuth, TRegisterAuth } from 'src/types/auth'

export const loginAuth = async (data: TLoginAuth) => {
  try {
    const res = await instanceAxios.post(`${CONFIG_API.AUTH.INDEX}/login`, data)
    return res.data
  } catch (error) {
    return null
  }
}

export const logoutAuth = async () => {
  try {
    const res = await instanceAxios.post(`${CONFIG_API.AUTH.INDEX}/logout`)
    return res.data
  } catch (error) {
    return null
  }
}

export const getAuthMe = async () => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.AUTH.INDEX}/me`)
    return res.data
  } catch (error) {
    return error
  }
}

export const registerAuth = async (data: TRegisterAuth) => {
  const res = await axios.post(`${CONFIG_API.AUTH.INDEX}/register`, data)
  return res.data
}
