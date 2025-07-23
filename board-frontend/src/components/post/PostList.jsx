import { Card, CardMedia, CardContent, CardActions, Typography, Button, Grid } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

import { removeBoard } from '../../features/boardSlice'

function PostList({ boards }) {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { user } = useSelector((state) => state.auth)

   const handleDelete = (id) => {
      if (window.confirm('삭제하시겠습니까?')) {
         dispatch(removeBoard(id))
            .unwrap()
            .then(() => {
               alert('삭제 완료')
            })
            .catch((error) => {
               console.error(`삭제 실패:`, error)
               alert('삭제 실패')
            })
      }
   }

   return (
      <Grid container spacing={3}>
         {boards.map((post) => {
            const imageUrl = `${import.meta.env.VITE_APP_API_URL}/uploads/${post.img}`

            return (
               <Grid key={post.id} sx={{ width: { xs: '100%', md: '50%' }, boxSizing: 'border-box' }}>
                  <Card sx={{ maxWidth: '100%' }}>
                     {post.img && <CardMedia component="img" height="240" image={imageUrl} alt={post.title} />}

                     <CardContent>
                        <Typography variant="h6">{post.title}</Typography>
                        <Typography variant="body2">{post.content}</Typography>
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
               </Grid>
            )
         })}
      </Grid>
   )
}

export default PostList
