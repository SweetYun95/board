import { Container } from '@mui/material'

import PostEdit from '../components/post/PostEdit'
import { editBoard } from '../../features/boardSlice'

const PostEditPage = () => {

const handleSubmit = async (e) => {
   e.preventDefault()
   const formData = new FormData()
   formData.append('title', title)
   formData.append('content', content)
   if (image) formData.append('image', image)

   try {
      await dispatch(editBoard({ id, formData })).unwrap()
      alert('게시글이 수정되었습니다.')
      navigate('/')
   } catch (error) {
      console.error('게시글 수정 실패:', error)
      alert('게시글 수정 중 오류가 발생했습니다.')
   }
}

   return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
         <PostEdit handleSubmit={handleSubmit} />
      </Container>
   )
}

export default PostEditPage
