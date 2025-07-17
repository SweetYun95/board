import { Container } from '@mui/material'

import PostEdit from '../components/post/PostEdit'

const PostEditPage = () => {
   return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
         <PostEdit />
      </Container>
   )
}

export default PostEditPage
