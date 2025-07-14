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
        const response = await boardApi.post()
    } catch (error) {
        
    }
}