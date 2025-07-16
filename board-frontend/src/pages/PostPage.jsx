import { Container } from '@mui/material'
import PostForm from '../components/post/PostForm'

const PostPage = () => {
   return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
         <PostForm />
      </Container>
   )
}

export default PostPage
