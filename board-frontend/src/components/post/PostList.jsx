import { Card, CardMedia, CardContent, CardActions, Typography, Button, Grid } from '@mui/material'

import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { getBoards, removeBoard } from '../../features/boardSlice'

function PostList() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { boards } = useSelector((state) => state.board)

   useEffect(() => {
      dispatch(getBoards())
   }, [dispatch])

   const handleDelete = (id) => {
      if (window.confirm('삭제하시겠습니까?')) {
         dispatch(removeBoard(id))
            .unwrap()
            .then(() => {
               navigate('/')
            })
            .catch((error) => {
               console.error(`게시물 삭제중 오류 발생: `, error)
               alert(`게시물 삭제에 실패 했습니다.`)
            })
      }
   }

   return (
      <Grid container spacing={3}>
         {boards.map((post) => {
            const imageUrl = `${import.meta.env.VITE_APP_API_URL}/uploads/${post.img}`
            console.log('🧾 게시물 ID:', post.id)
            console.log('📷 post.img 값:', post.img)
            console.log('🌐 렌더링될 이미지 URL:', imageUrl)

            return (
               <Grid item xs={12} md={6} key={post.id}>
                  <Card sx={{ maxWidth: '100%' }}>
                     {/* 이미지 영역 */}
                     {post.img ? (
                        <>
                           <CardMedia component="img" height="240" image={imageUrl} alt={post.title} />
                           <CardContent>
                              <Typography variant="caption" sx={{ color: 'green' }}>
                                 ✅ 이미지 포함됨
                              </Typography>
                              <br />
                              <a href={imageUrl} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'blue' }}>
                                 🔗 이미지 직접 열기
                              </a>
                           </CardContent>
                        </>
                     ) : (
                        <CardContent>
                           <Typography variant="caption" sx={{ color: 'red' }}>
                              ⚠️ 이미지 없음
                           </Typography>
                        </CardContent>
                     )}

                     {/* 게시글 내용 */}
                     <CardContent>
                        <Typography variant="h6" gutterBottom>
                           {post.title}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
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

                     {/* 버튼 */}
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
                  </Card>
               </Grid>
            )
         })}
      </Grid>
   )
}

export default PostList
