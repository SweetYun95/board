// src/pages/Home.jsx
import { Container, Typography, Pagination, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getBoards } from '../features/boardSlice'
import PostList from '../components/post/PostList'

function Home() {
   const dispatch = useDispatch()
   const { boards, loading } = useSelector((state) => state.board)
   const [page, setPage] = useState(1)
   const perPage = 3

   useEffect(() => {
      dispatch(getBoards())
   }, [dispatch])

   const pagedBoards = boards.slice((page - 1) * perPage, page * perPage)

   return (
      <Container sx={{ mt: 5 }}>
         <Typography variant="h4" gutterBottom>
            게시판
         </Typography>

         {loading ? <Typography>로딩 중...</Typography> : <PostList boards={pagedBoards} />}

         <Stack alignItems="center" sx={{ mt: 4 }}>
            <Pagination count={Math.ceil(boards.length / perPage)} page={page} onChange={(_, value) => setPage(value)} color="primary" />
         </Stack>
      </Container>
   )
}

export default Home
