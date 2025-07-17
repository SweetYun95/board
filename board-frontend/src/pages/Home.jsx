// src/pages/Home.jsx
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBoards, removeBoard } from '../features/boardSlice'
import { useSelector as useAuthSelector } from 'react-redux'
import { Card, CardContent, Typography, Button, Pagination, Stack } from '@mui/material'
import PostForm from '../components/post/PostForm'
function Home() {
   const dispatch = useDispatch()
   const { boards, loading } = useSelector((state) => state.board)
   const auth = useAuthSelector((state) => state.auth)
   const [page, setPage] = useState(1)
   const perPage = 3

   useEffect(() => {
      dispatch(getBoards())
   }, [dispatch])

   const handleDelete = (id) => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
         dispatch(removeBoard(id))
      }
   }

   const pagedBoards = boards.slice((page - 1) * perPage, page * perPage)

   return (
      <div style={{ padding: '2rem' }}>
         <Typography variant="h4" gutterBottom>
            게시판
         </Typography>

         {loading ? (
            <Typography>로딩 중...</Typography>
         ) : (
            pagedBoards.map((board) => (
               <Card key={board.id} sx={{ mb: 2 }}>
                  <CardContent>
                     <Typography variant="h6">{board.title}</Typography>
                     <Typography variant="body2" color="textSecondary">
                        작성자: {board.Member?.name || '알 수 없음'} ({board.Member?.email})
                     </Typography>
                     <Typography variant="body1" sx={{ mt: 1 }}>
                        {board.content}
                     </Typography>

                     {/* 로그인 유저이고 자기 글이면 수정/삭제 버튼 표시 */}
                     {auth.user && auth.user.id === board.member_Id && (
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                           <Button variant="outlined" size="small" color="primary">
                              수정
                           </Button>
                           <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(board.id)}>
                              삭제
                           </Button>
                        </Stack>
                     )}
                  </CardContent>
               </Card>
            ))
         )}

         <Stack alignItems="center" sx={{ mt: 4 }}>
            <Pagination count={Math.ceil(boards.length / perPage)} page={page} onChange={(_, value) => setPage(value)} color="primary" />
         </Stack>
      </div>
   )
}

export default Home
