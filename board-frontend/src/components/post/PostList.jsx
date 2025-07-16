import { Card, CardMedia, CardContent, CardActions, Typography, Button, Grid } from '@mui/material'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getBoards, removeBoard } from '../../features/boardSlice'

const PostList = () => {
   const dispatch = useDispatch()
   const { boards } = useSelector((state) => state.board)

   useEffect(() => {
      dispatch(getBoards())
   }, [dispatch])

   const handleDelete = (id) => {
      if (window.confirm('삭제하시겠습니까?')) {
         dispatch(removeBoard(id))
      }
   }

   return (
      <Grid container spacing={2}>
         {boards.map((post) => (
            <Grid item xs={12} md={6} key={post.id}>
               <Card>
                  <CardContent>
                     <Typography variant="h6">{post.title}</Typography>
                     <CardMedia sx={{ height: 240 }} image={`${import.meta.env.VITE_APP_API_URL}${post.img}`} title={post.content} />
                     <Typography variant="body2">{post.content}</Typography>
                     <Typography variant="caption" display="block" gutterBottom>
                        작성자: {post.Member?.name} / {new Date(post.createdAt).toLocaleString()}
                     </Typography>
                  </CardContent>
                  <CardActions>
                     <Button size="small" color="primary">
                        수정
                     </Button>
                     <Button size="small" color="error" onClick={() => handleDelete(post.id)}>
                        삭제
                     </Button>
                  </CardActions>
               </Card>
            </Grid>
         ))}
      </Grid>
   )
}

export default PostList
