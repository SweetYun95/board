import { TextField, Button, Box, Typography, Stack, Paper } from '@mui/material'

function PostEdit({ handleSubmit, title, setTitle, content, setContent, image, setImage, preview, setPreview, currentImageUrl }) {
   const handleImageChange = (e) => {
      const file = e.target.files[0]
      setImage(file)
      if (file) {
         setPreview(URL.createObjectURL(file))
      } else {
         setPreview(null)
      }
   }

   const showPreview = preview || currentImageUrl

   return (
      <Paper elevation={3} sx={{ p: 3 }}>
         <Typography variant="h6" gutterBottom>
            게시글 수정
         </Typography>
         <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data">
            <Stack spacing={2}>
               <TextField label="제목" value={title} onChange={(e) => setTitle(e.target.value)} required />
               <TextField label="내용" multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} required />
               <Button variant="contained" component="label">
                  이미지 수정
                  <input type="file" name="image" hidden accept="image/*" onChange={handleImageChange} />
               </Button>
               {showPreview && (
                  <Box sx={{ mt: 2 }}>
                     <img src={showPreview} alt="미리보기" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: 8 }} />
                  </Box>
               )}
               <Button type="submit" variant="contained" color="primary">
                  수정
               </Button>
            </Stack>
         </Box>
      </Paper>
   )
}

export default PostEdit
