import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_API_URL

// axios 생성
const boardApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true,
})

// 회원가입
export const joinUser = async (userData) => {
   try {
      console.log(`🙍‍♂️ userData: `, userData)
      const response = await boardApi.post(`/auth/join`, userData)
      console.log('🛵 response: ', response)
      return response
   } catch (error) {
      console.error(`API Request 오류:`, error)
      throw error
   }
}

// 로그인
export const loginUser = async (credential) => {
   try {
      console.log(`👪 credential: `, credential)
      const response = await boardApi.post(`/auth/login`, credential)
      console.log('🛵 response: ', response)
      return response
   } catch (error) {
      console.error(`API Request 오류:`, error)
      throw error
   }
}

// 로그아웃
export const logoutUser = async () => {
   try {
      const response = await boardApi.post(`/auth/logout`)
      console.log('🛵 response: ', response)
      return response
   } catch (error) {
      console.error(`API Request 오류:`, error)
      throw error
   }
}

// 로그인 상태확인
export const checkAuthStatus = async () => {
   try {
      const response = await boardApi.post(`/auth/status`)
      console.log('🛵 response: ', response)
      return response
   } catch (error) {
      console.error(`API Request 오류:`, error)
      throw error
   }
}
