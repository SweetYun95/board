import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

import { removeBoard } from '../../features/boardSlice'

function PostList({ boards }) {
   const dispatch = useDispatch()
   const { user } = useSelector((state) => state.auth)

   const handleDelete = (id) => {
      if (window.confirm('삭제하시겠습니까?')) {
         dispatch(removeBoard(id))
            .unwrap()
            .then(() => alert('삭제 완료'))
            .catch((error) => {
               console.error(`삭제 실패:`, error)
               alert('삭제 실패')
            })
      }
   }

   return (
      <Box
         sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'flex-start',
         }}
      >
         {boards.map((post) => {
            const imageUrl = `${import.meta.env.VITE_APP_API_URL}/uploads/${post.img}`

            return (
               <Box
                  key={post.id}
                  sx={{
                     flex: '1 1 300px', // 최소 300px, 그 이상은 공간에 맞게 자동 확장
                     maxWidth: '100%',
                     display: 'flex',
                  }}
               >
                  <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                     {post.img && (
                        <CardMedia
                           component="img"
                           image={imageUrl}
                           alt={post.title}
                           sx={{
                              width: '100%',
                              maxHeight: 300,
                              objectFit: 'cover',
                              borderTopLeftRadius: 4,
                              borderTopRightRadius: 4,
                           }}
                        />
                     )}

                     <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom noWrap>
                           {post.title}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }} noWrap>
                           {post.content}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                           작성자: {post.Member?.name || '알 수 없음'}
                        </Typography>
                        <br />
                        <Typography variant="caption" color="text.secondary">
                           {dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                        </Typography>
                     </CardContent>

                     {user?.id === post.member_Id && (
                        <CardActions>
                           <Link to={`/posts/edit/${post.id}`}>
                              <Button size="small" color="primary">
                                 수정
                              </Button>
                           </Link>
                           <Button size="small" color="error" onClick={() => handleDelete(post.id)}>
                              삭제
                           </Button>
                        </CardActions>
                     )}
                  </Card>
               </Box>
            )
         })}
      </Box>
   )
}

export default PostList
