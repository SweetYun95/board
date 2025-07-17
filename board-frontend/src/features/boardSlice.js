import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchBoards, fetchBoardById, createBoard, deleteBoard } from '../api/boardApi'

// 게시글 전체 조회
export const getBoards = createAsyncThunk('board/getBoards', async () => {
   const response = await fetchBoards()
   return response.data
})

// 게시글 단일 조회
export const getBoardById = createAsyncThunk('board/getBoardById', async (id) => {
   const response = await fetchBoardById(id)
   return response.data
})

// 게시글 등록
export const addBoard = createAsyncThunk('board/addBoard', async (formData) => {
   const response = await createBoard(formData)
   return response.data
})

// 게시글 삭제
export const removeBoard = createAsyncThunk('board/removeBoard', async (id) => {
   await deleteBoard(id)
   return id
})

const boardSlice = createSlice({
   name: 'board',
   initialState: {
      boards: [],
      currentBoard: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         // 전체 게시글 조회
         .addCase(getBoards.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getBoards.fulfilled, (state, action) => {
            state.loading = false
            state.boards = action.payload
         })
         .addCase(getBoards.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
         // 게시글 단일 조회
         .addCase(getBoardById.fulfilled, (state, action) => {
            state.currentBoard = action.payload
         })
         // 게시글 등록
         .addCase(addBoard.fulfilled, (state, action) => {
            state.boards.unshift(action.payload.post) // 최신글 맨 위에 추가
         })
         // 게시글 삭제
         .addCase(removeBoard.fulfilled, (state, action) => {
            state.boards = state.boards.filter((board) => board.id !== action.payload)
         })
   },
})

export default boardSlice.reducer
