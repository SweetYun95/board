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
      const response = await boardApi.get(`/auth/logout`)
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
      const response = await boardApi.get(`/auth/status`)
      console.log('🛵 response: ', response)
      return response
   } catch (error) {
      console.error(`API Request 오류:`, error)
      throw error
   }
}

/* ─── 게시판 관련 API ─── */

// 게시글 전체 조회
export const fetchBoards = async () => {
   const response = await boardApi.get('/board')
   return response
}

// 게시글 단일 조회
export const fetchBoardById = async (id) => {
   const response = await boardApi.get(`/board/${id}`)
   return response
}

// 게시글 등록 (이미지 포함)
export const createBoard = async (formData) => {
   const response = await boardApi.post('/board', formData, {
      headers: {
         'Content-Type': 'multipart/form-data',
      },
   })
   return response
}

// 게시글 삭제
export const deleteBoard = async (id) => {
   const response = await boardApi.delete(`/board/${id}`)
   return response
}

// 게시글 수정
export const updateBoard = async ({ id, formData }) => {
   const response = await boardApi.put(`/board/${id}`, formData, {
      headers: {
         'Content-Type': 'multipart/form-data',
      },
   })
   return response
}