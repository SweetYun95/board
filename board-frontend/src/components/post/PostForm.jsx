import { TextField, Button, Box, Typography, Stack, Paper } from '@mui/material'

import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addBoard } from '../../features/boardSlice'

const PostForm = () => {
   const dispatch = useDispatch()
   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')
   const [image, setImage] = useState(null)

   const handleSubmit = (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      if (image) formData.append('image', image)

      dispatch(addBoard(formData))

      setTitle('')
      setContent('')
      setImage(null)
   }

   return (
      <Paper elevation={3} sx={{ p: 3 }}>
         <Typography variant="h6" gutterBottom>
            게시글 작성
         </Typography>
         <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data">
            <Stack spacing={2}>
               <TextField label="제목" value={title} onChange={(e) => setTitle(e.target.value)} required />
               <TextField label="내용" multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} required />
               <Button variant="contained" component="label">
                  이미지 업로드
                  <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
               </Button>
               <Button type="submit" variant="contained" color="primary">
                  등록
               </Button>
            </Stack>
         </Box>
      </Paper>
   )
}

export default PostForm
