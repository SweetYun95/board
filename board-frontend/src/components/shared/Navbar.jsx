import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'

import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { logoutUserThunk } from '../../features/authSlice'

function Navbar({ isAuthenticated, user }) {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = () => {
      dispatch(logoutUserThunk())
         .unwrap()
         .then(() => {
            navigate('/') //로그아웃 완료 후 메인페이지로 이동
         })
         .catch((error) => {
            alert('로그아웃 실패:', error)
         })
   }

   return (
      <AppBar position="static" style={{ backgroundColor: '#fff', marginBottom: 50 }}>
         <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
               <Link to="/">News</Link>
            </Typography>

            {isAuthenticated ? (
               <>
                  <Link to="/posts/create">
                     <IconButton aria-label="글쓰기">
                        <CreateIcon />
                     </IconButton>
                  </Link>
                  <Link to="/my" style={{ textDecoration: 'none' }}>
                     <Typography variant="body1" style={{ marginRight: '20px', color: 'black' }}>
                        {/* ?(optional chaining): 값이 undefined 이거나 null일때 에러를 반환하지 않고 그냥 undefined를 반환 */}
                        {user?.name}님
                     </Typography>
                  </Link>
                  <Button onClick={handleLogout} variant="outlined">
                     로그아웃
                  </Button>
               </>
            ) : (
               <Link to="/login">
                  <Button color="inherit">Login</Button>
               </Link>
            )}
         </Toolbar>
      </AppBar>
   )
}

export default Navbar
