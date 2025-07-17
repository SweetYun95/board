import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { joinUser, loginUser, logoutUser, checkAuthStatus } from '../api/boardApi'

// 회원가입
export const joinUserThunk = createAsyncThunk(`auth/joinUserThunk`, async (userData, { rejectWithValue }) => {
   try {
      console.log('👪 userData: ', userData)
      const response = await joinUser(userData)
      return response.data.user
   } catch (error) {
        return rejectWithValue(error.response?.data?.message)
   }
})

// 로그인
export const loginUserThunk = createAsyncThunk(`auth/loginUserThunk`, async (credentials, { rejectWithValue }) => {
   try {
      const response = await loginUser(credentials)
      return response.data.user
   } catch (error) {
        return rejectWithValue(error.response?.data?.message)
   }
})

// 로그아웃
export const logoutUserThunk = createAsyncThunk(`auth/logoutUserThunk`, async (_, { rejectWithValue }) => {
   try {
      const response = await logoutUser()
      return response.data
   } catch (error) {
     return rejectWithValue(error.response?.data?.message)
   }
})

// 상태확인
export const checkAuthStatusThunk = createAsyncThunk(`auth/checkAuthStatusThunk`, async (_, { rejectWithValue }) => {
   try {
     const response = await checkAuthStatus()
      return response.data
   } catch (error) {
       return rejectWithValue(error.response?.data?.message)
   }
})

const authSlice = createSlice({
   name: `auth`,
   initialState: {
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
   },
   reducers: {
      clearAuthError: (state) => {
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         // 회원가입
         .addCase(joinUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(joinUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
         })
         .addCase(joinUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 로그인
         .addCase(loginUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(loginUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload
         })
         .addCase(loginUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 로그아웃
         .addCase(logoutUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(logoutUserThunk.fulfilled, (state) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null
         })
         .addCase(logoutUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 로그인 상태확인
         .addCase(checkAuthStatusThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(checkAuthStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = action.payload.isAuthenticated
            state.user = action.payload || null
         })
         .addCase(checkAuthStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.isAuthenticated = false
            state.user = null
         })
   },
})

export const { clearAuthError } = authSlice.actions
export default authSlice.reducer
